---
spec_id: admin/bluesound-nad-bluesound-zone-network
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bluesound NAD Bluesound Zone Network Control Spec"
manufacturer: Bluesound
model_family: "Bluesound Zone Network"
aliases: []
compatible_with:
  manufacturers:
    - Bluesound
    - "Bluesound NAD"
  models:
    - "Bluesound Zone Network"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluesoundprofessional.com
  - github.com
  - content-bluesound-com.s3.amazonaws.com
source_urls:
  - https://bluesoundprofessional.com/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://github.com/albertony/blushell
  - https://bluesoundprofessional.com/support/software-and-drivers/
  - https://content-bluesound-com.s3.amazonaws.com/uploads/2022/04/Custom-Integration-API-v1.4.pdf
retrieved_at: 2026-06-03T23:52:38.844Z
last_checked_at: 2026-09-13T22:16:28.814Z
generated_at: 2026-09-13T22:16:28.814Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model-specific command differences not stated; source is platform-wide BluOS API doc"
  - "source contains no safety warnings or interlock procedures."
  - "no power on/off commands in source (soft reboot only)"
  - "firmware version compatibility not stated beyond input-selection gating"
  - "fixed grouping (zones) out of scope of source; zone/zoneMaster/zoneSlave attributes observed but no set commands documented"
verification:
  verdict: verified
  checked_at: 2026-09-13T22:16:28.814Z
  matched_actions: 42
  action_count: 42
  confidence: medium
  summary: "All 42 spec actions match HTTP endpoints documented verbatim in the BluOS Custom Integration API source; transport values are explicitly stated. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# Bluesound NAD Bluesound Zone Network Control Spec

## Summary
BluOS network audio player (Bluesound/NAD family) controlled over HTTP via the BluOS Custom Integration API. Covers status long-polling, volume/mute, playback control, play-queue management, presets, content browsing/search, player grouping, input selection, Bluetooth mode, doorbell chime, and reboot. The source is the platform-wide BluOS Custom Integration API document — no Zone-Network-specific protocol document exists.

<!-- UNRESOLVED: model-specific command differences not stated; source is platform-wide BluOS API doc -->

## Transport
```yaml
protocols:
  - http
addressing:
  port: 11000  # stated: default for all BluOS players; CI580 exceptions use 11000/11010/11020/11030 per node
  base_url: "http://{player_ip}:{port}/{request}"  # pattern stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# inferred from command evidence in source
traits:
  - levelable   # inferred: volume/mute commands (/Volume)
  - queryable   # inferred: /Status, /SyncStatus, /Volume, /Playlist, /Presets queries
  - routable    # inferred: input/source selection (/Play?url=, /Play?inputIndex=, /Play?inputTypeIndex=)
```

## Actions
```yaml
actions:
  - id: status_query
    label: Playback Status Query
    kind: query
    command: "GET /Status?timeout={seconds}&etag={etag-value}"
    params:
      - name: timeout
        type: integer
        description: Optional long-poll duration in seconds. Recommended 100, no faster than 10.
      - name: etag
        type: string
        description: Optional etag attribute from previous /Status response.
  - id: sync_status_query
    label: Player and Group Sync Status Query
    kind: query
    command: "GET /SyncStatus?timeout={seconds}&etag={etag-value}"
    params:
      - name: timeout
        type: integer
        description: Optional long-poll interval in seconds. Recommended 180.
      - name: etag
        type: string
        description: Optional etag from previous /SyncStatus response.
  - id: volume_query
    label: Volume Query
    kind: query
    command: "GET /Volume"
    params: []
  - id: set_volume_level
    label: Set Volume (level 0-100)
    kind: action
    command: "GET /Volume?level={level}&tell_slaves={on_off}"
    params:
      - name: level
        type: integer
        description: Absolute volume level, integer 0-100.
      - name: tell_slaves
        type: integer
        description: 0 = selected player only; 1 = all players in group.
  - id: set_volume_abs_db
    label: Set Volume (absolute dB)
    kind: action
    command: "GET /Volume?abs_db={db}&tell_slaves={on_off}"
    params:
      - name: db
        type: number
        description: Absolute volume in dB.
      - name: tell_slaves
        type: integer
        description: 0 = selected player only; 1 = all players in group.
  - id: volume_up
    label: Volume Up
    kind: action
    command: "GET /Volume?db={db}"
    params:
      - name: db
        type: number
        description: Volume increase in dB (typical value 2).
  - id: volume_down
    label: Volume Down
    kind: action
    command: "GET /Volume?db={db}"
    params:
      - name: db
        type: number
        description: Volume decrease in dB as negative number (typical value -2).
  - id: mute_on
    label: Mute On
    kind: action
    command: "GET /Volume?mute=1&tell_slaves={on_off}"
    params:
      - name: tell_slaves
        type: integer
        description: 0 = selected player only; 1 = all players in group.
  - id: mute_off
    label: Mute Off
    kind: action
    command: "GET /Volume?mute=0&tell_slaves={on_off}"
    params:
      - name: tell_slaves
        type: integer
        description: 0 = selected player only; 1 = all players in group.
  - id: play
    label: Play
    kind: action
    command: "GET /Play"
    params: []
  - id: play_seek
    label: Play With Seek
    kind: action
    command: "GET /Play?seek={seconds}"
    params:
      - name: seek
        type: integer
        description: Jump position in seconds. Only valid if /Status includes totlen.
  - id: play_seek_track
    label: Play Track With Seek
    kind: action
    command: "GET /Play?seek={seconds}&id={trackid}"
    params:
      - name: seek
        type: integer
        description: Jump position in seconds.
      - name: id
        type: integer
        description: Track id in the queue.
  - id: play_url_stream
    label: Play URL Stream
    kind: action
    command: "GET /Play?url={encodedStreamURL}"
    params:
      - name: encodedStreamURL
        type: string
        description: URL of streamed custom audio, must be URL-encoded.
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
    label: Skip To Next Track
    kind: action
    command: "GET /Skip"
    params: []
  - id: back
    label: Back To Previous / Track Start
    kind: action
    command: "GET /Back"
    params: []
  - id: shuffle_set
    label: Set Shuffle
    kind: action
    command: "GET /Shuffle?state={state}"
    params:
      - name: state
        type: integer
        description: 0 = disable shuffle, 1 = enable shuffle.
  - id: repeat_set
    label: Set Repeat
    kind: action
    command: "GET /Repeat?state={state}"
    params:
      - name: state
        type: integer
        description: 0 = repeat queue, 1 = repeat track, 2 = repeat off.
  - id: radio_action
    label: Streaming Radio Station Action
    kind: action
    command: "GET /Action?service={service-name}&{action-param}={action-value}"
    params:
      - name: service-name
        type: string
        description: Music service name.
      - name: action-param
        type: string
        description: skip, love, or ban - full URL is given by the <action> element in the /Status response; any URI is possible.
      - name: action-value
        type: string
        description: Value from the <action> element URL in /Status response.
  - id: playlist_list
    label: List Play Queue Tracks
    kind: query
    command: "GET /Playlist?start={first}&end={last}"
    params:
      - name: start
        type: integer
        description: Optional first queue entry to include, from 0. Use with end for pagination.
      - name: end
        type: integer
        description: Optional last queue entry to include.
    notes: "GET /Playlist?length=1 returns queue status only (no track details). Unpaginated /Playlist may return a very long response."
  - id: track_delete
    label: Delete Track From Queue
    kind: action
    command: "GET /Delete?id={position}"
    params:
      - name: id
        type: integer
        description: Track id (queue position) to delete.
  - id: track_move
    label: Move Track In Queue
    kind: action
    command: "GET /Move?new={destination}&old={origin}"
    params:
      - name: new
        type: integer
        description: New position of the track being moved.
      - name: old
        type: integer
        description: Old position of the track being moved.
  - id: queue_clear
    label: Clear Play Queue
    kind: action
    command: "GET /Clear"
    params: []
  - id: queue_save
    label: Save Play Queue As Playlist
    kind: action
    command: "GET /Save?name={playlist_name}"
    params:
      - name: name
        type: string
        description: Name for the saved play queue.
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
        description: Preset id number, or +1 for next preset, or -1 for previous preset. Presets loop around.
  - id: browse
    label: Browse Music Content
    kind: query
    command: "GET /Browse?key={key-value}&withContextMenuItems=1"
    params:
      - name: key
        type: string
        description: Optional browseKey/nextKey/parentKey/contextMenuKey value from earlier response, URL-encoded. Absence = top-level browse.
      - name: withContextMenuItems
        type: integer
        description: Optional, always 1 - returns inline context menu for playlists, albums, tracks, stations, artists.
  - id: search
    label: Search Music Content
    kind: query
    command: "GET /Browse?key={key-value}&q={searchText}"
    params:
      - name: key
        type: string
        description: searchKey value from an earlier response.
      - name: q
        type: string
        description: Search string. Without key, performs a top-level search.
  - id: group_add_slave
    label: Group One Secondary Player
    kind: action
    command: "GET /AddSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}&group={GroupName}"
    params:
      - name: slave
        type: string
        description: IP address of the secondary player.
      - name: port
        type: integer
        description: Port of the secondary player. Default 11000.
      - name: group
        type: string
        description: Optional group name; BluOS assigns a default if omitted.
  - id: group_add_slaves
    label: Group Multiple Secondary Players
    kind: action
    command: "GET /AddSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
    params:
      - name: slaves
        type: string
        description: Comma-separated IP addresses of secondary players.
      - name: ports
        type: string
        description: Comma-separated port numbers of secondary players.
  - id: group_remove_slave
    label: Remove One Player From Group
    kind: action
    command: "GET /RemoveSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
    params:
      - name: slave
        type: string
        description: IP of the player to remove.
      - name: port
        type: integer
        description: Port of the player to remove.
  - id: group_remove_slaves
    label: Remove Multiple Players From Group
    kind: action
    command: "GET /RemoveSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
    params:
      - name: slaves
        type: string
        description: Comma-separated IP addresses of players to remove.
      - name: ports
        type: string
        description: Comma-separated port numbers of players to remove.
  - id: reboot
    label: Soft Reboot Player
    kind: action
    command: "POST /reboot"
    params:
      - name: yes
        type: string
        description: Any value (e.g. 1). Sent as form data (curl -d yes=1).
  - id: doorbell_chime_play
    label: Play Doorbell Chime
    kind: action
    command: "GET /Doorbell?play=1"
    params: []
  - id: inputs_list
    label: List Active Inputs
    kind: query
    command: "GET /RadioBrowse?service=Capture"
    params: []
  - id: settings_capture_query
    label: Query Capture Input Settings
    kind: query
    command: "GET /Settings?id=capture&schemaVersion=32"
    params: []
  - id: input_select_active
    label: Select Active Input By URL
    kind: action
    command: "GET /Play?url={URL_value}"
    params:
      - name: URL_value
        type: string
        description: URL attribute from /RadioBrowse?service=Capture response. BluOS HUB inputs supported by this command only.
  - id: input_select_index
    label: Select External Input By Index
    kind: action
    command: "GET /Play?inputIndex={IndexId}"
    params:
      - name: inputIndex
        type: integer
        description: 1-based index of inputs from /Settings?id=capture&schemaVersion=32 in numerical order, Bluetooth excluded. Firmware newer than v3.8.0 and older than v4.2.0.
  - id: input_select_type_index
    label: Select External Input By Type-Index
    kind: action
    command: "GET /Play?inputTypeIndex={typeIndex}"
    params:
      - name: typeIndex
        type: string
        description: "Format type-index. Types: spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone. Index starts at 1. Firmware v4.2.0 or newer."
  - id: bluetooth_mode_set
    label: Change Bluetooth Mode
    kind: action
    command: "GET /audiomodes?bluetoothAutoplay={value}"
    params:
      - name: value
        type: integer
        description: 0 = Manual, 1 = Automatic, 2 = Guest, 3 = Disabled.
```

## Feedbacks
```yaml
feedbacks:
  - id: playback_state
    type: enum
    values: [play, pause, stop, stream, connecting]
    source: "/Status <state>; play and stream have the same meaning; /Play resumes from pause but not stop"
  - id: volume_level
    type: integer
    source: "/Status <volume>, /SyncStatus volume, /Volume response body; 0..100, -1 means fixed volume"
  - id: volume_db
    type: number
    source: "/Status db, /Volume response db attribute"
  - id: mute_state
    type: enum
    values: ["0", "1"]
    source: "/Status mute, /SyncStatus mute, /Volume response mute attribute; 1 = muted"
  - id: shuffle_state
    type: enum
    values: ["0", "1"]
    source: "/Status <shuffle>; 0 = off, 1 = on"
  - id: repeat_state
    type: enum
    values: ["0", "1", "2"]
    source: "/Status <repeat>; 0 = repeat queue, 1 = repeat track, 2 = repeat off"
  - id: now_playing_metadata
    type: object
    source: "/Status title1/title2/title3 (MUST be used for UI), twoline_title1/twoline_title2, album, artist, name, service, streamFormat, quality, totlen, secs, song"
  - id: etag
    type: string
    source: "etag attribute of /Status and /SyncStatus root elements; opaque, used for long-polling change detection"
  - id: sync_status
    type: object
    source: "/SyncStatus - name, model, modelName, brand, group, id, mac, master, slave(s), zone, zoneMaster, zoneSlave, initialized, syncStat"
  - id: queue_id
    type: string
    source: "/Status <pid>; matches id attribute of /Playlist response; changes when queue changes"
  - id: preset_id
    type: string
    source: "/Status <prid>; matches prid attribute of /Presets response; change means purge cached /Presets"
  - id: battery
    type: object
    source: "/Status and /SyncStatus battery element (if battery pack): level percent, charging 1/0, icon URL"
  - id: stream_url_flag
    type: flag
    source: "/Status <streamUrl> presence means queue not source of audio; song/shuffle/repeat/next/previous not relevant"
```

## Variables
```yaml
variables:
  - id: volume
    type: integer
    range: "0..100 (-1 = fixed volume); dB variants constrained to configured range, typically -80..0"
    set: "GET /Volume?level= | GET /Volume?abs_db= | GET /Volume?db="
  - id: mute
    type: boolean
    set: "GET /Volume?mute=0|1"
  - id: shuffle
    type: enum
    values: ["0", "1"]
    set: "GET /Shuffle?state=0|1"
  - id: repeat
    type: enum
    values: ["0", "1", "2"]
    set: "GET /Repeat?state=0|1|2"
  - id: bluetooth_autoplay
    type: enum
    values: ["0", "1", "2", "3"]
    set: "GET /audiomodes?bluetoothAutoplay="
```

## Events
```yaml
# No unsolicited push events documented. State changes are observed via long-polling
# /Status and /SyncStatus with timeout and etag parameters.
events: []
```

## Macros
```yaml
# No multi-step sequences explicitly defined as macros in source.
# Note: external input selection is documented as a two-step procedure
# (query /RadioBrowse?service=Capture or /Settings?id=capture, then /Play?url=/inputIndex=).
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures.
# Note: context-menu item type "delete" says user confirmation should be requested (browsing hint, not a safety interlock).
```

## Notes
- Requests take the form `http://<player_ip>:<port>/<request>`; port 11000 for all BluOS players except CI580 (4 nodes: 11000/11010/11020/11030). Actual port should be discovered via MDNS services `musc.tcp` and `musp.tcp`.
- Lenbrook Service Discovery Protocol (LSDP): custom UDP-broadcast discovery on UDP port 11430 (IANA-assigned to Lenbrook). Announce ~every minute; startup burst of 7 packets at t=[0,1,2,3,5,7,10]s + 0-250ms random; query response delay 0-750ms random. Packet header: length, magic "LSDP", protocol version 1 (current).
- Polling limits: regular polling at most one request per 30 seconds; long-polling requests for the same resource never less than 1 second apart. Long-poll only one of /Status (recommended timeout 100s) or /SyncStatus (recommended 180s) — /Status includes <syncStat> indicating /SyncStatus changes.
- Grouped players: primary player is group main and selects source; requests to a secondary player for /Status, playback, queue, and browse are internally proxied to the primary. /SyncStatus long-polling needed to track each secondary player's volume.
- Volume range adjustable via BluOS Controller app (Settings -> Player -> Audio); typically -80..0 dB.
- secs is excluded from etag; clients must increment playback position locally when state is play or stream.
- Radio actions (/Action) URLs come from the <actions> element in /Status when playing a streaming radio station; any URI is possible, not only /Action.
- Preset numbers need not be sequential; presets loop top-to-bottom and bottom-to-top. Presets must be added/deleted via BluOS Controller app.
- Input selection is firmware-gated: `/Play?inputIndex=` for firmware newer than v3.8.0 and older than v4.2.0; `/Play?inputTypeIndex=` for v4.2.0 or newer. `/Play?url=` (11.1) works for active inputs from /RadioBrowse?service=Capture and is the only command supporting BluOS HUB inputs. External input selection via inputIndex/inputTypeIndex is recommended for CI.
- Bluetooth excluded from inputIndex numbering. Sources must be connected and not hidden for input selection.
- /Skip and /Back only apply to play-queue playback (no <streamUrl> in /Status); some streaming stations support skip/back/love/ban via /Action; TuneIn and Optical Input do not support skip.
- Title display: use title1/title2/title3 (three-line) or twoline_title1/twoline_title2 (two-line) for now-playing UI, not album/artist/name.
- Secondary-player proxying means /Delete, /Move etc. directed at a secondary affect the primary's queue.
<!-- UNRESOLVED: no power on/off commands in source (soft reboot only) -->
<!-- UNRESOLVED: firmware version compatibility not stated beyond input-selection gating -->
<!-- UNRESOLVED: fixed grouping (zones) out of scope of source; zone/zoneMaster/zoneSlave attributes observed but no set commands documented -->

## Provenance

```yaml
source_domains:
  - bluesoundprofessional.com
  - github.com
  - content-bluesound-com.s3.amazonaws.com
source_urls:
  - https://bluesoundprofessional.com/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://github.com/albertony/blushell
  - https://bluesoundprofessional.com/support/software-and-drivers/
  - https://content-bluesound-com.s3.amazonaws.com/uploads/2022/04/Custom-Integration-API-v1.4.pdf
retrieved_at: 2026-06-03T23:52:38.844Z
last_checked_at: 2026-09-13T22:16:28.814Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-13T22:16:28.814Z
matched_actions: 42
action_count: 42
confidence: medium
summary: "All 42 spec actions match HTTP endpoints documented verbatim in the BluOS Custom Integration API source; transport values are explicitly stated. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model-specific command differences not stated; source is platform-wide BluOS API doc"
- "source contains no safety warnings or interlock procedures."
- "no power on/off commands in source (soft reboot only)"
- "firmware version compatibility not stated beyond input-selection gating"
- "fixed grouping (zones) out of scope of source; zone/zoneMaster/zoneSlave attributes observed but no set commands documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
