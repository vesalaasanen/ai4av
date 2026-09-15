---
spec_id: admin/bluesound-nad-soundmachine
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bluesound NAD SoundMachine (BluOS) Control Spec"
manufacturer: Bluesound
model_family: SoundMachine
aliases: []
compatible_with:
  manufacturers:
    - Bluesound
    - "Bluesound NAD"
  models:
    - SoundMachine
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluesoundprofessional.com
  - bluos.io
source_urls:
  - https://bluesoundprofessional.com/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://bluesoundprofessional.com/software-and-drivers/
retrieved_at: 2026-05-21T14:35:45.949Z
last_checked_at: 2026-09-14T22:17:25.880Z
generated_at: 2026-09-14T22:17:25.880Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version constraints noted in source (inputIndex vs inputTypeIndex,3.8.0 /4.2.0 boundaries) but no single firmware version stated"
  - "CI580 four-node port mapping is documented but SoundMachine-specific behaviour not stated"
  - "source does not define settable scalar variables distinct from action parameters"
  - "source does not document unsolicited push events; long-polling on /Status and /SyncStatus is the documented change-detection mechanism"
  - "source does not define composite macro sequences"
  - "source contains no safety warnings, interlocks, or power-on sequencing"
  - "per-input enumeration for SoundMachine-specific hardware (which spdif/analog/coax/bluetooth indices actually exist) is not stated in source"
verification:
  verdict: verified
  checked_at: 2026-09-14T22:17:25.880Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 49 spec actions have literal HTTP-path matches in source; transport port/base_url/protocol verified verbatim. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# Bluesound NAD SoundMachine (BluOS) Control Spec

## Summary
BluOS Custom Integration API for Bluesound / NAD / DALI streaming players. All commands are HTTP requests sent to the player on TCP port 11000 (default; CI580 uses 11000/11010/11020/11030). Responses are UTF-8 encoded XML. The API covers status queries, volume and mute, playback control, play queue management, presets, content browsing/search, player grouping, soft reboot, doorbell chime, direct input selection, and Bluetooth mode. Discovery is via mDNS service types `musc.tcp` and `musp.tcp` (or LSDP UDP broadcast on port 11430).

<!-- UNRESOLVED: firmware version constraints noted in source (inputIndex vs inputTypeIndex,3.8.0 /4.2.0 boundaries) but no single firmware version stated -->
<!-- UNRESOLVED: CI580 four-node port mapping is documented but SoundMachine-specific behaviour not stated -->

## Transport
```yaml
protocols:
  - tcp
  - httpaddressing:
  port: 11000
  base_url: "http://<player_ip>:11000"
auth:
  type: none  # inferred: no login/auth procedure documented in source
```

## Traits
```yaml
- powerable  # inferred from reboot / power-cycle context
- levelable  # inferred from /Volume level / db / abs_db commands
- queryable  # inferred from /Status, /SyncStatus, /Playlist, /Presets queries
- routable  # inferred from input selection (/Play?url, /Play?inputIndex, /Play?inputTypeIndex)
```

## Actions
```yaml
- id: status_query
  label: Playback Status Query
  kind: query
  command: "/Status"
  params: []
- id: status_long_poll
  label: Playback Status (long poll)
  kind: query
  command: "/Status?timeout={seconds}&etag={etag}"
  params:
    - name: seconds
      type: integer
      description: Long-poll duration (recommended ~100s)
    - name: etag
      type: string
      description: etag from previous /Status response
- id: sync_status_query
  label: Player and Group Sync Status Query
  kind: query
  command: "/SyncStatus"
  params: []
- id: sync_status_long_poll
  label: Sync Status (long poll)
  kind: query
  command: "/SyncStatus?timeout={seconds}&etag={etag}"
  params:
    - name: seconds
      type: integer
      description: Long-poll duration (recommended ~180s)
    - name: etag
      type: string
      description: etag from previous /SyncStatus response
- id: volume_set_level
  label: Set Volume (0..100)
  kind: action
  command: "/Volume?level={level}&tell_slaves={tell_slaves}"
  params:
    - name: level
      type: integer
      description: Absolute volume level 0-100
    - name: tell_slaves
      type: integer
      description: 0 = current player only; 1 = apply to all grouped players
- id: volume_set_abs_db
  label: Set Volume (absolute dB)
  kind: action
  command: "/Volume?abs_db={db}&tell_slaves={tell_slaves}"
  params:
    - name: db
      type: number
      description: Absolute dB level
    - name: tell_slaves
      type: integer
      description: 0/1 propagate to slaves
- id: volume_delta_db
  label: Volume Relative Change (dB)
  kind: action
  command: "/Volume?db={delta_db}&tell_slaves={tell_slaves}"
  params:
    - name: delta_db
      type: number
      description: Positive or negative dB delta - name: tell_slaves
      type: integer
      description: 0/1 propagate to slaves
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
- id: play_seek
  label: Play with Seek
  kind: action
  command: "/Play?seek={seconds}"
  params:
    - name: seconds
      type: integer
      description: Jump position in seconds
- id: play_seek_track
  label: Play Seek to Track
  kind: action
  command: "/Play?seek={seconds}&id={trackid}"
  params:
    - name: seconds
      type: integer
      description: Position within track
    - name: trackid
      type: integer
      description: Track position in queue
- id: play_url
  label: Play Streamed URL
  kind: action
  command: "/Play?url={encodedStreamURL}"
  params:
    - name: encodedStreamURL
      type: string
      description: URL-encoded audio stream URL
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
  label: Skip
  kind: action
  command: "/Skip"
  params: []
- id: back
  label: Back
  kind: action
  command: "/Back"
  params: []
- id: shuffle  label: Shuffle
  kind: action
  command: "/Shuffle?state={state}"
  params:
    - name: state
      type: integer
      description: 0 = off, 1 = on
- id: repeat
  label: Repeat
  kind: action
  command: "/Repeat?state={state}"
  params:
    - name: state
      type: integer
      description: 0 = repeat queue, 1 = repeat track, 2 = repeat off
- id: action_radio
  label: Streaming Radio Action (skip/back/love/ban)
  kind: action
  command: "/Action?service={service}&{action}={id}"
  params:
    - name: service
      type: string
      description: Service name (e.g. Slacker)
    - name: action
      type: string
      description: One of skip/back/love/ban
    - name: id
      type: string
      description: Opaque ID from /Status <actions>
- id: playlist_list
  label: List Play Queue
  kind: query
  command: "/Playlist"
  params: []
- id: playlist_status
  label: Play Queue Status
  kind: query
  command: "/Playlist?length=1"
  params: []
- id: playlist_page
  label: Play Queue Page
  kind: query
  command: "/Playlist?start={first}&end={last}"
  params:
    - name: first
      type: integer
      description: Start index (0-based)
    - name: last
      type: integer
      description: End index
- id: delete_track
  label: Delete Track from Queue
  kind: action
  command: "/Delete?id={position}"
  params:
    - name: position
      type: integer
      description: Position in queue
- id: move_track
  label: Move Track in Queue
  kind: action
  command: "/Move?new={destination}&old={origin}"
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
  command: "/Clear"
  params: []
- id: save_queue
  label: Save Play Queue as Playlist
  kind: action
  command: "/Save?name={playlist_name}"
  params:
    - name: playlist_name
      type: string
      description: Playlist name (URL-encoded)
- id: presets_list
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
      description: Preset ID, or +1 (next) / -1 (previous)
- id: preset_next
  label: Next Preset
  kind: action
  command: "/Preset?id=+1"
  params: []
- id: preset_previous
  label: Previous Preset
  kind: action
  command: "/Preset?id=-1"
  params: []
- id: browse  label: Browse Content
  kind: query
  command: "/Browse?key={key_value}"
  params:
    - name: key_value
      type: string
      description: URL-encoded key from prior response
- id: browse_with_context_menu
  label: Browse with Inline Context Menu
  kind: query
  command: "/Browse?key={key_value}&withContextMenuItems=1"
  params:
    - name: key_value
      type: string
      description: URL-encoded key
- id: search
  label: Search Content
  kind: query
  command: "/Browse?key={key_value}&q={searchText}"
  params:
    - name: key_value
      type: string
      description: searchKey from prior response (URL-encoded)
    - name: searchText
      type: string
      description: Search term (URL-encoded)
- id: radio_browse
  label: Browse Inputs (Capture service)
  kind: query
  command: "/RadioBrowse?service=Capture"
  params: []
- id: settings_capture
  label: Capture Settings  kind: query
  command: "/Settings?id=capture&schemaVersion=32"
  params: []
- id: group_add_slave
  label: Group One Slave Player
  kind: action
  command: "/AddSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}&group={GroupName}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: IP address of secondary player
    - name: secondaryPlayerPort
      type: integer
      description: Port number of secondary player
    - name: GroupName
      type: string
      description: Optional group name
- id: group_add_slaves
  label: Group Multiple Slave Players
  kind: action
  command: "/AddSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated secondary player IPs
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated secondary player ports
- id: group_remove_slave
  label: Remove One Slave Player
  kind: action
  command: "/RemoveSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: IP of secondary player
    - name: secondaryPlayerPort
      type: integer
      description: Port of secondary player
- id: group_remove_slaves
  label: Remove Multiple Slave Players
  kind: action
  command: "/RemoveSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
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
  command: "POST /reboot"
  params:
    - name: yes
      type: string
      description: Any value (e.g. 1), form-encoded
- id: doorbell_play
  label: Play Doorbell Chime
  kind: action
  command: "/Doorbell?play=1"
  params: []
- id: input_select_url
  label: Select Input (by URL)
  kind: action
  command: "/Play?url={URL_value}"
  params:
    - name: URL_value
      type: string
      description: URL attribute from /RadioBrowse?service=Capture response
- id: input_select_index
  label: Select Input (by index, firmware v3.8.0 - v4.2.0)
  kind: action
  command: "/Play?inputIndex={IndexId}"
  params:
    - name: IndexId
      type: integer
      description: Input index from /Settings?id=capture&schemaVersion=32 (Bluetooth excluded)
- id: input_select_type_index
  label: Select Input (by type-index, firmware v4.2.0+)
  kind: action
  command: "/Play?inputTypeIndex={type_index}"
  params:
    - name: type_index
      type: string
      description: Format type-index where type is spdif/analog/coax/bluetooth/arc/earc/phono/computer/aesebu/balanced/microphone
- id: bluetooth_mode
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
- id: mute_state
  type: enum
  values: [muted, unmuted]
- id: shuffle_state
  type: enum
  values: [on, off]
- id: repeat_state
  type: enum
  values: [repeat_queue, repeat_track, repeat_off]
- id: volume_level
  type: integer
  description: Volume level 0..100 (or -1 for fixed)
- id: volume_db
  type: number
  description: Volume level in dB
- id: now_playing_title
  type: string
  description: title1/title2/title3 from /Status
- id: track_position
  type: integer
  description: song (position in queue) and secs (elapsed seconds)
- id: track_total_length
  type: integer
  description: totlen in seconds
- id: player_name
  type: string
  description: name from /SyncStatus
- id: player_model
  type: string
  description: modelName from /SyncStatus
- id: player_brand
  type: string
  description: brand from /SyncStatus
- id: player_mac
  type: string
  description: mac from /SyncStatus
- id: player_id
  type: string
  description: id (IP:port) from /SyncStatus
- id: group_name
  type: string
  description: group from /SyncStatus
- id: sync_state
  type: integer
  description: syncStat counter from /Status or /SyncStatus
- id: initialized
  type: boolean
  description: initialized from /SyncStatus (true = setup complete)
```

## Variables
```yaml
# UNRESOLVED: source does not define settable scalar variables distinct from action parameters
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited push events; long-polling on /Status and /SyncStatus is the documented change-detection mechanism
```

## Macros
```yaml
# UNRESOLVED: source does not define composite macro sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing
```

## Notes
- All endpoints are HTTP GET requests to `http://<player_ip>:11000/<request>` unless otherwise noted; `/reboot` is HTTP POST with form-encoded `yes=1`.
- Port 11000 is the default BluOS port. The NAD CI580 is a four-streamer chassis using ports 11000/11010/11020/11030 (one per node). Actual port for any BluOS player should be discovered via mDNS service types `musc.tcp` and `musp.tcp` (or LSDP UDP broadcast on port 11430).
- Discovery: LSDP uses UDP broadcast on registered port 11430; Announce messages broadcast ~every 57s; startup bursts of 7 packets at [0,1,2,3,5,7,10]s + 0-250ms random jitter; Query response delay 0-750ms random. Packet magic word is ASCII "LSDP"; protocol version 1 (in header); multi-byte values big-endian.
- Long polling: `/Status` recommended interval100s, minimum 10s; `/SyncStatus` recommended 180s. Do not make two consecutive same-resource requests less than 1s apart during long-polling. When not using long-polling, restrict polling to one request per 30s.
- Volume range typically -80..0 dB, configurable in the BluOS Controller app (Settings -> Player -> Audio).
- `/Play?inputIndex=N` is documented for firmware strictly between v3.8.0 and v4.2.0; `/Play?inputTypeIndex={type}-{index}` for v4.2.0 or newer. `inputIndex` excludes Bluetooth.
- Grouped secondary players proxy many requests (/Status, playback, queue, browse) to the primary player internally; use `/SyncStatus` long-polling to track per-secondary volume.
- Image URLs starting with `/Artwork` may redirect; append `followRedirects=1` to avoid redirect.
<!-- UNRESOLVED: per-input enumeration for SoundMachine-specific hardware (which spdif/analog/coax/bluetooth indices actually exist) is not stated in source -->
```

Spec emitted. Wrap and ingest next?

## Provenance

```yaml
source_domains:
  - bluesoundprofessional.com
  - bluos.io
source_urls:
  - https://bluesoundprofessional.com/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://bluesoundprofessional.com/software-and-drivers/
retrieved_at: 2026-05-21T14:35:45.949Z
last_checked_at: 2026-09-14T22:17:25.880Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-14T22:17:25.880Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 49 spec actions have literal HTTP-path matches in source; transport port/base_url/protocol verified verbatim. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version constraints noted in source (inputIndex vs inputTypeIndex,3.8.0 /4.2.0 boundaries) but no single firmware version stated"
- "CI580 four-node port mapping is documented but SoundMachine-specific behaviour not stated"
- "source does not define settable scalar variables distinct from action parameters"
- "source does not document unsolicited push events; long-polling on /Status and /SyncStatus is the documented change-detection mechanism"
- "source does not define composite macro sequences"
- "source contains no safety warnings, interlocks, or power-on sequencing"
- "per-input enumeration for SoundMachine-specific hardware (which spdif/analog/coax/bluetooth indices actually exist) is not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
