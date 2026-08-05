---
spec_id: admin/bluesound-nad-audacy
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bluesound NAD Audacy Control Spec"
manufacturer: Bluesound
model_family: "Bluesound NAD Audacy"
aliases: []
compatible_with:
  manufacturers:
    - Bluesound
    - "Bluesound NAD"
  models:
    - "Bluesound NAD Audacy"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://bluos.io/wp-content/uploads/2025/05/BluOS_Crestron_Unified_Driver_Package_v1.6.0.zip
  - https://bluos.io/wp-content/uploads/2025/11/BluOS_Control4_Driver_Package_v4.0.0.zip
  - https://bluos.io/wp-content/uploads/2026/04/BluOS_RTI_Driver_Package_2.60.zip
  - https://bluos.io/downloads/
retrieved_at: 2026-05-21T13:44:13.781Z
last_checked_at: 2026-07-21T23:32:29.657Z
generated_at: 2026-07-21T23:32:29.657Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "/AddFavourite?service=...&albumid=... (context-menu example only)"
  - "/Add?service=...&playnow=...&where=... (context-menu example only)"
  - "exact Audacy model hardware features (which inputs, display, etc.) not stated in source — doc covers all BluOS players generically"
  - "no unsolicited push notification mechanism documented; long-polling via /Status?timeout&etag is the only documented change-detection mechanism"
  - "no multi-step macro sequences documented in source"
  - "no safety warnings or interlock procedures found in source"
  - "firmware version compatibility ranges not stated for specific Audacy model"
  - "exact Audacy-specific hardware inputs (optical, analog, HDMI ARC, etc.) not specified in source"
  - "error response formats only partially documented (error root element mentioned for Browse)"
  - "maximum concurrent connection limits not stated"
  - "Add/RemoveFavourite endpoints referenced in browse contextMenu examples but not documented as standalone commands"
  - "/Add?service=...&albumid=...&playnow=...&where=...` referenced in browse contextMenu but not documented as standalone action"
verification:
  verdict: verified
  checked_at: 2026-07-21T23:32:29.657Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec actions map to documented BluOS HTTP endpoints with matching params; coverage exceeds the floor. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Bluesound NAD Audacy Control Spec

## Summary
BluOS-based network audio player controlled via HTTP GET requests over TCP/IP on port 11000. Responses are UTF-8 encoded XML. Supports playback control, volume management, play queue operations, preset recall, content browsing, player grouping, direct input selection, Bluetooth mode configuration, doorbell chime playback, and soft reboot.

<!-- UNRESOLVED: exact Audacy model hardware features (which inputs, display, etc.) not stated in source — doc covers all BluOS players generically -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://{player_ip}:11000"
  port: 11000
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred: reboot command present
  - queryable     # inferred: /Status, /SyncStatus queries present
  - levelable     # inferred: volume control commands present
  - routable      # inferred: input selection and player grouping commands present
```

## Actions
```yaml
actions:
  - id: play
    label: Play
    kind: action
    command: "/Play"
    params:
      - name: seek
        type: integer
        description: "Jump to position in seconds within current track"
      - name: id
        type: integer
        description: "Track ID in queue to play"
      - name: url
        type: string
        description: "URL-encoded stream URL to play (selects input when sourced from /RadioBrowse?service=Capture)"

  - id: pause
    label: Pause
    kind: action
    command: "/Pause"
    params:
      - name: toggle
        type: integer
        description: "Set to 1 to toggle current pause state"

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

  - id: shuffle
    label: Set Shuffle
    kind: action
    command: "/Shuffle?state={state}"
    params:
      - name: state
        type: integer
        description: "0 to disable shuffle, 1 to enable shuffle"

  - id: repeat
    label: Set Repeat
    kind: action
    command: "/Repeat?state={state}"
    params:
      - name: state
        type: integer
        description: "0 = repeat queue, 1 = repeat track, 2 = repeat off"

  - id: volume_set
    label: Set Volume (level 0-100)
    kind: action
    command: "/Volume?level={level}&tell_slaves={tell_slaves}"
    params:
      - name: level
        type: integer
        description: "Absolute volume level 0-100"
      - name: tell_slaves
        type: integer
        description: "0 = this player only, 1 = all grouped players"

  - id: volume_set_db
    label: Set Volume (absolute dB)
    kind: action
    command: "/Volume?abs_db={db}&tell_slaves={tell_slaves}"
    params:
      - name: db
        type: number
        description: "Absolute volume in dB (typically -80..0)"
      - name: tell_slaves
        type: integer
        description: "0 = this player only, 1 = all grouped players"

  - id: volume_set_db_delta
    label: Set Volume (relative dB delta)
    kind: action
    command: "/Volume?db={delta_db}&tell_slaves={tell_slaves}"
    params:
      - name: delta_db
        type: number
        description: "Relative volume change in dB (positive or negative; typical increment is 2 dB)"
      - name: tell_slaves
        type: integer
        description: "0 = this player only, 1 = all grouped players"

  - id: volume_up
    label: Volume Up
    kind: action
    command: "/Volume?db={delta_db}"
    params:
      - name: delta_db
        type: number
        description: "Positive dB delta (typical 2)"

  - id: volume_down
    label: Volume Down
    kind: action
    command: "/Volume?db={delta_db}"
    params:
      - name: delta_db
        type: number
        description: "Negative dB delta (typical -2)"

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

  - id: volume_query
    label: Query Volume
    kind: query
    command: "/Volume"
    params: []

  - id: status_query
    label: Playback Status Query
    kind: query
    command: "/Status"
    params:
      - name: timeout
        type: integer
        description: "Long-poll duration in seconds (recommended 100, min 10)"
      - name: etag
        type: string
        description: "etag from previous /Status response for long-polling"

  - id: sync_status_query
    label: Player/Group Sync Status Query
    kind: query
    command: "/SyncStatus"
    params:
      - name: timeout
        type: integer
        description: "Long-poll duration in seconds (recommended 180)"
      - name: etag
        type: string
        description: "etag from previous /SyncStatus response"

  - id: playlist_query
    label: List Play Queue
    kind: query
    command: "/Playlist"
    params:
      - name: length
        type: integer
        description: "Set to 1 to return only top-level attributes (no track details)"
      - name: start
        type: integer
        description: "First queue entry index (0-based) for pagination"
      - name: end
        type: integer
        description: "Last queue entry index for pagination"

  - id: track_delete
    label: Delete Track
    kind: action
    command: "/Delete?id={id}"
    params:
      - name: id
        type: integer
        description: "Position of track to delete from queue"

  - id: track_move
    label: Move Track
    kind: action
    command: "/Move?new={new}&old={old}"
    params:
      - name: new
        type: integer
        description: "New position in queue"
      - name: old
        type: integer
        description: "Current position in queue"

  - id: queue_clear
    label: Clear Queue
    kind: action
    command: "/Clear"
    params: []

  - id: queue_save
    label: Save Queue
    kind: action
    command: "/Save?name={name}"
    params:
      - name: name
        type: string
        description: "Name for the saved playlist"

  - id: presets_list
    label: List Presets
    kind: query
    command: "/Presets"
    params: []

  - id: preset_load
    label: Load Preset
    kind: action
    command: "/Preset?id={id}"
    params:
      - name: id
        type: string
        description: "Preset ID number, or +1 for next, or -1 for previous"

  - id: browse
    label: Browse Content
    kind: query
    command: "/Browse?key={key}&withContextMenuItems={withContextMenuItems}"
    params:
      - name: key
        type: string
        description: "Browse key from previous response for navigation (URL-encoded)"
      - name: withContextMenuItems
        type: integer
        description: "Set to 1 to include inline context menu"

  - id: browse_top
    label: Top-Level Browse
    kind: query
    command: "/Browse"
    params: []

  - id: search
    label: Search Content
    kind: query
    command: "/Browse?key={key}&q={q}"
    params:
      - name: key
        type: string
        description: "Search key (searchKey) from browse response (URL-encoded)"
      - name: q
        type: string
        description: "Search string"

  - id: radio_browse
    label: Browse Capture Inputs / Hub Inputs
    kind: query
    command: "/RadioBrowse?service=Capture"
    params: []

  - id: radio_action
    label: Streaming Radio Action (generic)
    kind: action
    command: "/Action?service={service}&{action_param}={id}"
    params:
      - name: service
        type: string
        description: "Service name (e.g. Slacker)"
      - name: action_param
        type: string
        description: "Action parameter name from <action> element (skip, back, love, ban)"
      - name: id
        type: string
        description: "Track/action id from <action> element"

  - id: radio_skip
    label: Streaming Radio Skip
    kind: action
    command: "/Action?service={service}&skip={id}"
    params:
      - name: service
        type: string
        description: "Service name (e.g. Slacker)"
      - name: id
        type: string
        description: "Track id from <action> url attribute"

  - id: radio_back
    label: Streaming Radio Back
    kind: action
    command: "/Action?service={service}&back={id}"
    params:
      - name: service
        type: string
        description: "Service name"
      - name: id
        type: string
        description: "Track id from <action> url attribute"

  - id: radio_love
    label: Streaming Radio Love (favorite)
    kind: action
    command: "/Action?service={service}&love={id}"
    params:
      - name: service
        type: string
        description: "Service name"
      - name: id
        type: string
        description: "Track id"

  - id: radio_ban
    label: Streaming Radio Ban (dislike + skip)
    kind: action
    command: "/Action?service={service}&ban={id}"
    params:
      - name: service
        type: string
        description: "Service name"
      - name: id
        type: string
        description: "Track id"

  - id: settings_query
    label: Query Player Settings
    kind: query
    command: "/Settings?id=capture&schemaVersion=32"
    params: []

  - id: group_add
    label: Add Player to Group (single)
    kind: action
    command: "/AddSlave?slave={slave}&port={port}&group={group}"
    params:
      - name: slave
        type: string
        description: "IP address of secondary player"
      - name: port
        type: integer
        description: "Port of secondary player"
      - name: group
        type: string
        description: "Optional group name"

  - id: group_add_multi
    label: Add Players to Group (multi)
    kind: action
    command: "/AddSlave?slaves={slaves}&ports={ports}"
    params:
      - name: slaves
        type: string
        description: "Comma-separated IP addresses"
      - name: ports
        type: string
        description: "Comma-separated ports"

  - id: group_remove
    label: Remove Player from Group (single)
    kind: action
    command: "/RemoveSlave?slave={slave}&port={port}"
    params:
      - name: slave
        type: string
        description: "IP address of secondary player to remove"
      - name: port
        type: integer
        description: "Port of secondary player"

  - id: group_remove_multi
    label: Remove Players from Group (multi)
    kind: action
    command: "/RemoveSlave?slaves={slaves}&ports={ports}"
    params:
      - name: slaves
        type: string
        description: "Comma-separated IP addresses"
      - name: ports
        type: string
        description: "Comma-separated ports"

  - id: input_select
    label: Select Input (URL from Capture)
    kind: action
    command: "/Play?url={url}"
    params:
      - name: url
        type: string
        description: "URL value from /RadioBrowse?service=Capture response"

  - id: input_select_index
    label: Select Input (Index, fw 3.8.0-4.2.0)
    kind: action
    command: "/Play?inputIndex={inputIndex}"
    params:
      - name: inputIndex
        type: integer
        description: "1-based index from /Settings capture response (Bluetooth excluded)"

  - id: input_select_type_index
    label: Select Input (Type-Index, fw 4.2.0+)
    kind: action
    command: "/Play?inputTypeIndex={inputTypeIndex}"
    params:
      - name: inputTypeIndex
        type: string
        description: "Format type-index, e.g. spdif-1, analog-1, arc-1, earc-1, phono-1, coax-1, computer-1, aesebu-1, balanced-1, microphone-1, bluetooth-1"

  - id: doorbell
    label: Play Doorbell Chime
    kind: action
    command: "/Doorbell?play={play}"
    params:
      - name: play
        type: integer
        description: "Always 1 to play doorbell"

  - id: bluetooth_mode
    label: Set Bluetooth Mode
    kind: action
    command: "/audiomodes?bluetoothAutoplay={bluetoothAutoplay}"
    params:
      - name: bluetoothAutoplay
        type: integer
        description: "0=Manual, 1=Automatic, 2=Guest, 3=Disabled"

  - id: reboot
    label: Reboot Player
    kind: action
    command: "/reboot"  # POST
    method: POST
    params:
      - name: yes
        type: string
        description: "Any value to confirm reboot"
```

## Feedbacks
```yaml
feedbacks:
  - id: playback_status
    type: xml
    description: "Full playback status from /Status including state, track info, volume, shuffle, repeat, sleep, alarm, battery, group info, syncStat, etag"

  - id: sync_status
    type: xml
    description: "Player and group status from /SyncStatus including volume, grouping, model/brand info, master/slave topology, zone info, mac, etag"

  - id: volume_status
    type: xml
    description: "Volume level from /Volume response including db, mute state, offsetDb, etag, muteDb, muteVolume"

  - id: playlist_status
    type: xml
    description: "Play queue info from /Playlist including track list (with albumid, service, artistid, songid, id, title, art, alb), shuffle state, length, id, modified"

  - id: playlist_summary
    type: xml
    description: "Queue top-level attributes only (no song details) from /Playlist?length=1"

  - id: presets_list
    type: xml
    description: "List of presets from /Presets response with prid, name, id, url, image"

  - id: browse_result
    type: xml
    description: "Content browse/search results from /Browse response with items, categories, searchKey, nextKey, parentKey, contextMenu"

  - id: browse_error
    type: xml
    description: "Error response enclosed in <error> root element with <message> and zero or more <detail> text nodes"

  - id: capture_inputs
    type: xml
    description: "Input list from /RadioBrowse?service=Capture including local inputs and HUB remote inputs with inputType, id, URL, image, serviceType"

  - id: doorbell_status
    type: xml
    description: "Doorbell chime status from /Doorbell response with enable, volume, chime attributes"

  - id: shuffle_response
    type: xml
    description: "Playlist state after /Shuffle: name, modified, length, shuffle, id"

  - id: repeat_response
    type: xml
    description: "Playlist state after /Repeat: length, id, repeat"

  - id: delete_response
    type: xml
    description: "Track deletion confirmation: <deleted>position</deleted>"

  - id: move_response
    type: xml
    description: "Track move confirmation: <moved>moved</moved>"

  - id: clear_response
    type: xml
    description: "Queue clear confirmation: <playlist modified length id/>"

  - id: save_response
    type: xml
    description: "Save queue confirmation: <saved><entries>count</entries></saved>"

  - id: preset_load_response
    type: xml
    description: "Preset load confirmation: <loaded service><entries>count</entries></loaded> for playlists, or <state>stream</state> for radio"

  - id: group_add_response
    type: xml
    description: "Group add confirmation: <addSlave><slave port id/></addSlave>"

  - id: settings_capture
    type: xml
    description: "Capture settings menu groups (Bluetooth, Analog Input, Optical Input, etc.) from /Settings?id=capture&schemaVersion=32"

  - id: skip_response
    type: xml
    description: "Skip confirmation: <id>trackid</id>"

  - id: back_response
    type: xml
    description: "Back confirmation: <id>trackid</id>"

  - id: play_state_response
    type: xml
    description: "Play confirmation: <state>play|stream|pause|stop</state>"

  - id: pause_state_response
    type: xml
    description: "Pause confirmation: <state>pause</state>"

  - id: stop_state_response
    type: xml
    description: "Stop confirmation: <state>stop</state>"

  - id: radio_action_ack
    type: xml
    description: "Streaming radio action ack: <skip/>, <back/>, or <love> with skip attribute and notification text"
```

## Variables
```yaml
variables:
  - id: volume
    type: integer
    min: 0
    max: 100
    description: "Player volume level percentage; -1 means fixed volume"

  - id: volume_db
    type: number
    description: "Volume level in dB scale (typically -80..0)"

  - id: mute
    type: enum
    values: ["0", "1"]
    description: "0 = unmuted, 1 = muted"

  - id: shuffle_state
    type: enum
    values: ["0", "1"]
    description: "0 = shuffle off, 1 = shuffle on"

  - id: repeat_state
    type: enum
    values: ["0", "1", "2"]
    description: "0 = repeat queue, 1 = repeat track, 2 = repeat off"

  - id: playback_state
    type: enum
    values: ["play", "pause", "stop", "stream", "connecting"]
    description: "Current player state (play and stream are equivalent)"

  - id: bluetooth_autoplay
    type: enum
    values: ["0", "1", "2", "3"]
    description: "Bluetooth source mode: 0=Manual, 1=Automatic, 2=Guest, 3=Disabled"

  - id: doorbell_volume
    type: integer
    description: "Volume level for doorbell chime playback"
```

## Events
```yaml
# UNRESOLVED: no unsolicited push notification mechanism documented; long-polling via /Status?timeout&etag is the only documented change-detection mechanism
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for:
  - reboot
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
- All commands are HTTP GET requests except `/reboot` which is HTTP POST.
- Responses are UTF-8 encoded XML.
- Long polling supported on `/Status` and `/SyncStatus` via `timeout` and `etag` parameters. Recommended `/Status` timeout 100s, `/SyncStatus` 180s.
- When not long-polling, restrict polling to at most one request every 30 seconds. When long-polling, never make two consecutive requests for the same resource less than 1 second apart.
- Player discovery via mDNS (services `musc.tcp`, `musp.tcp`, `muss.tcp`, `mush.tcp`, `musz.tcp`, `remote-web-ui.tcp`, `sovi-mfg.tcp`, `sovi-keypad.tcp`) or LSDP (UDP port 11430, big-endian binary, packet magic `LSDP`, protocol version 1).
- CI580 multi-zone player uses ports 11000, 11010, 11020, 11030 for nodes 1-4.
- `/Volume?mute=1` mutes; `/Volume?mute=0` unmutes (counterintuitive: 1=mute).
- Volume range is configurable via BluOS Controller app, typically -80..0 dB.
- Input selection has three API variants: `/Play?url=` (always works), `/Play?inputIndex=N` (fw 3.8.0-4.2.0), `/Play?inputTypeIndex=type-N` (fw 4.2.0+). Supported input types include spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone.
- Grouped secondary players proxy many requests (`/Status`, playback control, play queue, content browse/search) to the primary player internally.
- `/RadioBrowse?service=Capture` returns both local inputs and remote HUB inputs (`hub<ip-port>-input<N>` ids).
- LSDP startup packets: 7 packets at t=[0,1,2,3,5,7,10]s + 0-250ms jitter; main announce period 57s + 0-6s jitter; query response delay 0-750ms.
- LSDP class IDs: 0x0001=BluOS Player (`_musc._tcp`), 0x0002=BluOS Server (`_muss._tcp`), 0x0003=BluOS Player secondary in multi-zone (`_musp._tcp`), 0x0004=sovi-mfg, 0x0005=sovi-keypad, 0x0006=BluOS Player pair slave (`_musz._tcp`), 0x0007=Remote Web App (`_remote-web-ui._tcp`), 0x0008=BluOS Hub (`_mush._tcp`), 0xFFFF=all classes.
- Streaming radio actions return `<skip/>`, `<back/>`, or `<love>1</love>` / `<love skip="1">0</love>` (ban) responses; <response> root or <action> notification attribute for user-facing messages.

<!-- UNRESOLVED: firmware version compatibility ranges not stated for specific Audacy model -->
<!-- UNRESOLVED: exact Audacy-specific hardware inputs (optical, analog, HDMI ARC, etc.) not specified in source -->
<!-- UNRESOLVED: error response formats only partially documented (error root element mentioned for Browse) -->
<!-- UNRESOLVED: maximum concurrent connection limits not stated -->
<!-- UNRESOLVED: Add/RemoveFavourite endpoints referenced in browse contextMenu examples but not documented as standalone commands -->
<!-- UNRESOLVED: `/Add?service=...&albumid=...&playnow=...&where=...` referenced in browse contextMenu but not documented as standalone action -->

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://bluos.io/wp-content/uploads/2025/05/BluOS_Crestron_Unified_Driver_Package_v1.6.0.zip
  - https://bluos.io/wp-content/uploads/2025/11/BluOS_Control4_Driver_Package_v4.0.0.zip
  - https://bluos.io/wp-content/uploads/2026/04/BluOS_RTI_Driver_Package_2.60.zip
  - https://bluos.io/downloads/
retrieved_at: 2026-05-21T13:44:13.781Z
last_checked_at: 2026-07-21T23:32:29.657Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T23:32:29.657Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec actions map to documented BluOS HTTP endpoints with matching params; coverage exceeds the floor. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "/AddFavourite?service=...&albumid=... (context-menu example only)"
- "/Add?service=...&playnow=...&where=... (context-menu example only)"
- "exact Audacy model hardware features (which inputs, display, etc.) not stated in source — doc covers all BluOS players generically"
- "no unsolicited push notification mechanism documented; long-polling via /Status?timeout&etag is the only documented change-detection mechanism"
- "no multi-step macro sequences documented in source"
- "no safety warnings or interlock procedures found in source"
- "firmware version compatibility ranges not stated for specific Audacy model"
- "exact Audacy-specific hardware inputs (optical, analog, HDMI ARC, etc.) not specified in source"
- "error response formats only partially documented (error root element mentioned for Browse)"
- "maximum concurrent connection limits not stated"
- "Add/RemoveFavourite endpoints referenced in browse contextMenu examples but not documented as standalone commands"
- "/Add?service=...&albumid=...&playnow=...&where=...` referenced in browse contextMenu but not documented as standalone action"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
