---
spec_id: admin/bluesound-nad-deezer
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bluesound NAD BluOS Custom Integration Control Spec"
manufacturer: Bluesound
model_family: "BluOS Player"
aliases: []
compatible_with:
  manufacturers:
    - Bluesound
    - "Bluesound NAD"
  models:
    - "BluOS Player"
    - CI580
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - content-bluesound-com.s3.amazonaws.com
source_urls:
  - https://content-bluesound-com.s3.amazonaws.com/uploads/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-05-21T13:48:57.857Z
last_checked_at: 2026-09-13T22:17:56.864Z
generated_at: 2026-09-13T22:17:56.864Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "per-model feature coverage (Bluetooth, doorbell, grouping, HUB inputs) varies by hardware; this spec documents the CI API surface, not per-model matrix"
  - "LSDP discovery UDP port 11430 is documented but the per-player HTTP control endpoint is the primary control transport; UDP/LSDP is discovery-only and listed separately in Notes"
  - "source does not document explicit user-defined macro sequences"
  - "source does not contain safety warnings, interlocks, or power-on sequencing requirements."
  - "source notes /Status for grouped (secondary) players is a copy of the primary; misrouted commands at the secondary will be proxied internally to primary (section 8 intro)."
  - "firmware version compatibility ranges for individual endpoints (e.g. /Play?inputIndex vs /Play?inputTypeIndex) are stated as v3.8.0/v4.2.0 boundaries, but per-endpoint minimum firmware versions across the whole API are not enumerated"
  - "voltage, current, power specifications not stated in source"
  - "fault behavior or error recovery sequences not stated in source"
verification:
  verdict: verified
  checked_at: 2026-09-13T22:17:56.864Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec actions map verbatim to source endpoints; transport port 11000 and UDP 11430 are documented; source command catalogue is fully represented. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# Bluesound NAD BluOS Custom Integration Control Spec

## Summary
Control spec for Bluesound / NAD / DALI BluOS networked audio players using the vendor-published Custom Integration (CI) HTTP API. The interface is HTTP GET to port 11000 (per-player; CI580 uses 11000/11010/11020/11030) returning UTF-8 encoded XML. Discovery is via mDNS service types `musc.tcp`/`musp.tcp` or the vendor LSDP UDP-broadcast protocol on port 11430.

<!-- UNRESOLVED: per-model feature coverage (Bluetooth, doorbell, grouping, HUB inputs) varies by hardware; this spec documents the CI API surface, not per-model matrix -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  port: 11000  # per-player HTTP control port; CI580 nodes use 11010/11020/11030
 base_url: "/"
auth:
  type: none  # inferred: no auth procedure in source
```

<!-- UNRESOLVED: LSDP discovery UDP port 11430 is documented but the per-player HTTP control endpoint is the primary control transport; UDP/LSDP is discovery-only and listed separately in Notes -->

## Traits
```yaml
- powerable  # inferred: soft reboot via POST /reboot (section 9)
- routable  # inferred: input selection via /Play?url=, /Play?inputIndex=, /Play?inputTypeIndex= (section 11)
- queryable  # inferred: /Status and /SyncStatus queries (sections 2.1, 2.2)
- levelable  # inferred: /Volume level / db / mute control (section 3)
```

## Actions
```yaml
- id: status_query
  label: Playback Status
  kind: query
  command: "GET /Status"
  params:
    - name: timeout
      type: integer
      description: Optional long-polling timeout in seconds
    - name: etag
      type: string
      description: Optional etag from previous /Status response
- id: sync_status_query
  label: Player and Group Sync Status
  kind: query
  command: "GET /SyncStatus"
  params:
    - name: timeout
      type: integer
      description: Optional long-polling timeout in seconds
    - name: etag
      type: string
      description: Optional etag from previous /SyncStatus response
- id: volume_set
  label: Set Volume (level 0..100)
  kind: action
  command: "GET /Volume?level={level}&tell_slaves={tell_slaves}"
  params:
    - name: level
      type: integer
      description: Absolute volume level 0..100
    - name: tell_slaves
      type: integer
      description: 0 = only this player; 1 = apply to all grouped players
- id: volume_set_abs_db
  label: Set Volume (absolute dB)
  kind: action
  command: "GET /Volume?abs_db={abs_db}&tell_slaves={tell_slaves}"
  params:
    - name: abs_db
      type: number
      description: Absolute volume in dB
    - name: tell_slaves
      type: integer
      description: 0 = only this player; 1 = apply to all grouped players
- id: volume_up
  label: Volume Up (+2 dB typical)
  kind: action
  command: "GET /Volume?db={db}"
  params:
    - name: db
      type: number
      description: Volume delta in dB (positive; typical value 2)
- id: volume_down
  label: Volume Down (-2 dB typical)
  kind: action
  command: "GET /Volume?db={db}"
  params:
    - name: db
      type: number
      description: Volume delta in dB (negative; typical value -2)
- id: volume_relative_db
  label: Relative Volume Change
  kind: action
  command: "GET /Volume?db={delta_db}&tell_slaves={tell_slaves}"
  params:
    - name: delta_db
      type: number
      description: Signed dB delta
    - name: tell_slaves
      type: integer
      description: 0 = only this player; 1 = apply to all grouped players
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
  label: Play with Seek
  kind: action
  command: "GET /Play?seek={seconds}"
  params:
    - name: seconds
      type: integer
      description: Jump to position in current track
- id: play_seek_id
  label: Play with Seek and Track Id
  kind: action
  command: "GET /Play?seek={seconds}&id={trackid}"
  params:
    - name: seconds
      type: integer
      description: Position in track
    - name: trackid
      type: integer
      description: Track id in queue
- id: play_url
  label: Play Streamed Custom Audio
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
  label: Back (Previous Track or Restart)
  kind: action
  command: "GET /Back"
  params: []
- id: shuffle
  label: Shuffle
  kind: action
  command: "GET /Shuffle?state={state}"
  params:
    - name: state
      type: integer
      description: 0 = off, 1 = on
- id: repeat
  label: Repeat
  kind: action
  command: "GET /Repeat?state={state}"
  params:
    - name: state
      type: integer
      description: 0 = repeat queue, 1 = repeat track, 2 = off
- id: action_radio
  label: Streaming Radio Action (skip/back/love/ban)
  kind: action
  command: "GET /Action?service={service}&{key}={value}"
  params:
    - name: service
      type: string
      description: Service name (e.g. Slacker, Radio Paradise)
    - name: key
      type: string
      description: Action key (skip|back|love|ban) with track id value
- id: playlist_query
  label: List Play Queue
  kind: query
  command: "GET /Playlist"
  params:
    - name: length
      type: integer
      description: Return only top-level attributes if1
    - name: start
      type: integer
      description: First entry index (0-based)
    - name: end
      type: integer
      description: Last entry index
- id: delete_track
  label: Delete Track from Queue
  kind: action
  command: "GET /Delete?id={position}"
  params:
    - name: position
      type: integer
      description: Track id in queue to remove
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
      description: Saved playlist name (URL-encoded)
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
      description: Preset id, or +1 for next, -1 for previous
- id: browse
  label: Browse Music Content
  kind: query
  command: "GET /Browse?key={key_value}&withContextMenuItems=1"
  params:
    - name: key_value
      type: string
      description: URL-encoded key from prior browseKey/nextKey/parentKey/contextMenuKey
    - name: withContextMenuItems
      type: integer
      description: Always 1 to retrieve inline context menu
- id: browse_search
  label: Search Music Content
  kind: query
  command: "GET /Browse?key={key_value}&q={searchText}"
  params:
    - name: key_value
      type: string
      description: URL-encoded searchKey from prior response
    - name: searchText
      type: string
      description: Search term (URL-encoded)
- id: group_add_slave
  label: Group Secondary Player
  kind: action
  command: "GET /AddSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}&group={GroupName}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: Secondary player IP
    - name: secondaryPlayerPort
      type: integer
      description: Secondary player port (default 11000)
    - name: GroupName
      type: string
      description: Optional group name
- id: group_add_slaves_multi
  label: Group Multiple Secondary Players
  kind: action
  command: "GET /AddSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated secondary player IPs
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated secondary player ports
- id: group_remove_slave
  label: Remove One Secondary Player
  kind: action
  command: "GET /RemoveSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: Secondary player IP
    - name: secondaryPlayerPort
      type: integer
      description: Secondary player port
- id: group_remove_slaves_multi
  label: Remove Multiple Secondary Players
  kind: action
  command: "GET /RemoveSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated secondary player IPs
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated secondary player ports
- id: reboot
  label: Soft Reboot Player
  kind: action
  command: "POST /reboot  body: yes=1"
  params: []
- id: doorbell_play
  label: Play Doorbell Chime
  kind: action
  command: "GET /Doorbell?play=1"
  params: []
- id: input_select_active
  label: Active Input Selection (Capture URL)
  kind: action
  command: "GET /Play?url={URL_value}"
  params:
    - name: URL_value
      type: string
      description: URL attribute from /RadioBrowse?service=Capture response (URL-encoded)
- id: input_select_index  label: External Input Selection (inputIndex, legacy firmware)
  kind: action
  command: "GET /Play?inputIndex={IndexId}"
  params:
    - name: IndexId
      type: integer
      description: 1-based index from /Settings?id=capture (Bluetooth excluded); firmware newer than v3.8.0 and older than v4.2.0
- id: input_select_type_index
  label: External Input Selection (inputTypeIndex)
  kind: action
  command: "GET /Play?inputTypeIndex={type_index}"
  params:
    - name: type_index
      type: string
      description: Format type-index; type in {spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone}; index starts at 1; firmware v4.2.0+
- id: radio_browse_capture
  label: Radio Browse Capture (input list)
  kind: query
  command: "GET /RadioBrowse?service=Capture"
  params: []
- id: bluetooth_autoplay
  label: Set Bluetooth Mode
  kind: action
  command: "GET /audiomodes?bluetoothAutoplay={value}"
  params:
    - name: value
      type: integer
      description: 0=Manual, 1=Automatic, 2=Guest, 3=Disabled
- id: add_favourite
  label: Add Favourite
  kind: action
  command: "GET /AddFavourite?service={service}&albumid={albumid}"
  params:
    - name: service
      type: string
      description: Music service id
    - name: albumid
      type: string
      description: Album id
- id: add_to_queue
  label: Add to Queue
  kind: action
  command: "GET /Add?service={service}&albumid={albumid}&playnow={playnow}&clear={clear}&shuffle={shuffle}&where={where}"
  params:
    - name: service
      type: string
      description: Music service id
    - name: albumid
      type: string
      description: Album id
    - name: playnow
      type: integer
      description: 1 = play now, 0 = no, -1 = do not play now
    - name: clear
      type: integer
      description: 1 = clear queue first
    - name: shuffle
      type: integer
      description: 1 = shuffle
    - name: where
      type: string
      description: nextAlbum | last | next
- id: settings_query
  label: Settings Query
  kind: query
  command: "GET /Settings?id={id}&schemaVersion={schemaVersion}"
  params:
    - name: id
      type: string
      description: Settings id (e.g. capture)
    - name: schemaVersion
      type: integer
      description: Schema version (32 documented)
```

## Feedbacks
```yaml
- id: playback_state
  type: enum
  values: [play, pause, stop, stream, connecting]
  description: Returned in /Status and playback command responses
- id: volume_level
  type: integer
  description: 0..100 from /Status and /Volume responses; -1 = fixed volume
- id: volume_db
  type: number
  description: Volume in dB from /Status and /Volume responses
- id: mute_state
  type: enum
  values: [muted, unmuted]
  description: mute=1 means muted
- id: shuffle_state
  type: enum
  values: [off, on]
  description:0=off, 1=on- id: repeat_state
  type: enum
  values: [queue, track, off]
  description: 0=repeat queue, 1=repeat track, 2=off
- id: sleep_timer_minutes
  type: integer
  description: Minutes remaining before sleep timer activates
- id: song_position
  type: integer
  description: Position of current track in play queue
- id: queue_length
  type: integer
  description: Total tracks in current play queue
- id: queue_modified
  type: enum
  values: [clean, modified]
  description: 0 = not modified since loaded, 1 = modified
- id: stream_url_present
  type: boolean
  description: Presence of <streamUrl> indicates play queue is not the source
- id: sync_stat
  type: integer
  description: Changes whenever any item in /SyncStatus changes; matches /Status syncStat
- id: doorbell_enabled
  type: enum
  values: [enabled, disabled]
  description: enable=1 means chime available
```

## Variables
```yaml
# Settable per-player parameters that aren't discrete actions
- name: volume_level
  type: integer
  description: 0..100 (or -1 fixed)
- name: mute  type: integer
  description: 0 = unmuted, 1 = muted
- name: shuffle
  type: integer
  description: 0 = off, 1 = on
- name: repeat
  type: integer
  description: 0 = repeat queue, 1 = repeat track, 2 = off
- name: bluetooth_autoplay_mode
  type: integer
  description: 0=Manual, 1=Automatic, 2=Guest, 3=Disabled
- name: group_name
  type: string
  description: Set when adding a slave to a group
```

## Events
```yaml
# Long-polling on /Status or /SyncStatus surfaces changes; etag mismatches signal state change.
- id: status_changed
  description: Emitted implicitly when /Status long-poll returns due to state change (etag differs)
- id: sync_status_changed
  description: Emitted implicitly when /SyncStatus long-poll returns due to grouping/volume/name change
```

## Macros
```yaml
# UNRESOLVED: source does not document explicit user-defined macro sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not contain safety warnings, interlocks, or power-on sequencing requirements.
# UNRESOLVED: source notes /Status for grouped (secondary) players is a copy of the primary; misrouted commands at the secondary will be proxied internally to primary (section 8 intro).
```

## Notes
- Default HTTP control port is **11000** per player; the **CI580** uses four streamers in one chassis on ports **11000 / 11010 / 11020 / 11030**; the actual port should be discovered via mDNS service types `musc.tcp` and `musp.tcp`, or via the LSDP UDP-broadcast discovery protocol (port **11430**).
- LSDP (Lenbrook Service Discovery Protocol) is an alternative UDP-broadcast discovery mechanism on registered UDP port **11430** using magic word `LSDP`, big-endian multi-byte values, and packet header version `1`. Steady-state Announce interval ~57s + 0-6s random; startup sends 7 packets at [0,1,2,3,5,7,10]s + 0-250ms.
- When long-polling, recommended interval is 100s for `/Status` and 180s for `/SyncStatus`; never faster than 10s; do not make two consecutive same-resource requests <1s apart.
- External input selection command varies by firmware: `inputIndex` for firmware newer than v3.8.0 and older than v4.2.0; `inputTypeIndex` (format `type-index`) for firmware v4.2.0 or newer.
- Image URLs starting with `/Artwork` may redirect; append `followRedirects=1` when retrieving to avoid redirect (also applies to preset `image` attribute).
- All HTTP requests are GET (except `/reboot` which is POST with body `yes=1`); parameters are URL-encoded name/value pairs; responses are UTF-8 encoded XML.
- `browseKey`, `contextMenuKey`, `searchKey` values must be URI-encoded (percent-escaped) when used as `key` parameter to `/Browse`.
- Grouping: only one primary player; secondary players can have many requests (Status, playback, queue, browse) internally proxied to primary.
- The Document title says **"NAD"** in the header but the spec covers Bluesound, NAD Electronics, and DALI Loudspeakers BluOS players.

<!-- UNRESOLVED: firmware version compatibility ranges for individual endpoints (e.g. /Play?inputIndex vs /Play?inputTypeIndex) are stated as v3.8.0/v4.2.0 boundaries, but per-endpoint minimum firmware versions across the whole API are not enumerated -->
<!-- UNRESOLVED: voltage, current, power specifications not stated in source -->
<!-- UNRESOLVED: fault behavior or error recovery sequences not stated in source -->
```

---

Self-check passed: status=draft, confidence=low, derived_from=vendor_manual, no fabricated voltages/ports/baud. Endpoint paths and parameter names copied verbatim from source.

## Provenance

```yaml
source_domains:
  - content-bluesound-com.s3.amazonaws.com
source_urls:
  - https://content-bluesound-com.s3.amazonaws.com/uploads/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-05-21T13:48:57.857Z
last_checked_at: 2026-09-13T22:17:56.864Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-13T22:17:56.864Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec actions map verbatim to source endpoints; transport port 11000 and UDP 11430 are documented; source command catalogue is fully represented. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "per-model feature coverage (Bluetooth, doorbell, grouping, HUB inputs) varies by hardware; this spec documents the CI API surface, not per-model matrix"
- "LSDP discovery UDP port 11430 is documented but the per-player HTTP control endpoint is the primary control transport; UDP/LSDP is discovery-only and listed separately in Notes"
- "source does not document explicit user-defined macro sequences"
- "source does not contain safety warnings, interlocks, or power-on sequencing requirements."
- "source notes /Status for grouped (secondary) players is a copy of the primary; misrouted commands at the secondary will be proxied internally to primary (section 8 intro)."
- "firmware version compatibility ranges for individual endpoints (e.g. /Play?inputIndex vs /Play?inputTypeIndex) are stated as v3.8.0/v4.2.0 boundaries, but per-endpoint minimum firmware versions across the whole API are not enumerated"
- "voltage, current, power specifications not stated in source"
- "fault behavior or error recovery sequences not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
