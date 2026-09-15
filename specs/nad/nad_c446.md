---
spec_id: admin/nad-c446
schema_version: ai4av-public-spec-v1
revision: 1
title: "NAD C446 Control Spec"
manufacturer: NAD
model_family: C446
aliases: []
compatible_with:
  manufacturers:
    - NAD
  models:
    - C446
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-07-14T20:14:45.901Z
last_checked_at: 2026-09-13T22:16:55.666Z
generated_at: 2026-09-13T22:16:55.666Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source uses NAD C446 as target but API is the generic BluOS Custom Integration API shared with Bluesound/DALI products; model-specific quirks not stated."
  - "discrete power-on/off not exposed via this API; only reboot"
  - "source describes long-polling as a polling technique, not unsolicited push events."
  - "no multi-step sequences described in source."
  - "source contains no safety warnings, interlocks, or power-on sequencing."
  - "firmware version compatibility not stated in source for C446 specifically."
  - "authentication credentials or token formats not documented in source; assume LAN-only / no auth."
verification:
  verdict: verified
  checked_at: 2026-09-13T22:16:55.666Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec actions have literal source counterparts; transport port 11000 verified; source command catalogue fully represented. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# NAD C446 Control Spec

## Summary
BluOS CI API for NAD C446 multi-zone music streamer. HTTP GET/POST endpoints over TCP port 11000 returning UTF-8 XML. Covers playback, queue, presets, browse/search, grouping, volume, mute, input selection, reboot, doorbell, and Bluetooth mode.

<!-- UNRESOLVED: source uses NAD C446 as target but API is the generic BluOS Custom Integration API shared with Bluesound/DALI products; model-specific quirks not stated. -->

## Transport
```yaml
protocols:
  - http
  - tcp
  - udp
addressing:
  port: 11000  # BluOS default; CI580 nodes use 11000/11010/11020/11030
auth:
  type: none  # inferred: no auth procedure in source
```

**Note:** LSDP service discovery uses UDP broadcast on port 11430 (separate from control).

## Traits
```yaml
- powerable  # inferred: reboot endpoint exists
- levelable  # inferred: /Volume endpoints with level/db/abs_db
- routable  # inferred: input selection endpoints
- queryable  # inferred: /Status, /SyncStatus queries
```

## Actions
```yaml
# CRITICAL - verbatim payload rule applies.
- id: status
  label: Playback Status
  kind: query
  command: "GET /Status?timeout={seconds}&etag={etag}"
  params:
    - name: timeout
      type: integer
      description: Optional long-poll duration in seconds (recommended 100, min 10)
    - name: etag
      type: string
      description: Optional etag from previous /Status response

- id: sync_status
  label: Player and Group Sync Status
  kind: query
  command: "GET /SyncStatus?timeout={seconds}&etag={etag}"
  params:
    - name: timeout
      type: integer
      description: Optional long-poll interval seconds (recommended 180)
    - name: etag
      type: string
      description: Optional etag from previous /SyncStatus response

- id: volume_set_level
  label: Set Volume (0-100)
  kind: action
  command: "GET /Volume?level={level}&tell_slaves={tell_slaves}"
  params:
    - name: level
      type: integer
      description: Absolute volume 0-100
    - name: tell_slaves
      type: integer
      description: 0 = only this player, 1 = group

- id: volume_set_mute
  label: Set Mute State
  kind: action
  command: "GET /Volume?mute={mute}&tell_slaves={tell_slaves}"
  params:
    - name: mute
      type: integer
      description: 0 = mute, 1 = unmute
    - name: tell_slaves
      type: integer
      description: 0 = only this player, 1 = group

- id: volume_set_abs_db
  label: Set Volume (absolute dB)
  kind: action
  command: "GET /Volume?abs_db={db}&tell_slaves={tell_slaves}"
  params:
    - name: db
      type: number
      description: Absolute dB value
    - name: tell_slaves
      type: integer
      description: 0 = only this player, 1 = group

- id: volume_up
  label: Volume Up (relative dB)
  kind: action
  command: "GET /Volume?db={delta_db}"
  params:
    - name: delta_db
      type: number
      description: Positive dB delta (typical 2)

- id: volume_down
  label: Volume Down (relative dB)
  kind: action
  command: "GET /Volume?db={delta_db}"
  params:
    - name: delta_db
      type: number
      description: Negative dB delta (typical -2)

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
  label: Play with Seek
  kind: action
  command: "GET /Play?seek={seconds}"
  params:
    - name: seconds
      type: integer
      description: Seek position in seconds

- id: play_seek_id
  label: Play at Track Position
  kind: action
  command: "GET /Play?seek={seconds}&id={trackid}"
  params:
    - name: seconds
      type: integer
      description: Seek position in seconds
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
  label: Skip Next Track
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
  label: Set Repeat
  kind: action
  command: "GET /Repeat?state={state}"
  params:
    - name: state
      type: integer
      description: 0 = repeat queue, 1 = repeat track, 2 = off

- id: action_skip_radio
  label: Radio Skip Action
  kind: action
  command: "GET /Action?service={service}&skip={id}"
  params:
    - name: service
      type: string
      description: From <action> element in /Status
    - name: id
      type: string
      description: Stream id

- id: action_love
  label: Radio Love Action
  kind: action
  command: "GET /Action?service={service}&love={id}"
  params:
    - name: service
      type: string
      description: From <action> element
    - name: id
      type: string
      description: Stream id

- id: action_ban
  label: Radio Ban Action
  kind: action
  command: "GET /Action?service={service}&ban={id}"
  params:
    - name: service
      type: string
      description: From <action> element
    - name: id
      type: string
      description: Stream id

- id: playlist_list
  label: List Tracks
  kind: query
  command: "GET /Playlist?length={length}&start={start}&end={end}"
  params:
    - name: length
      type: integer
      description: Set to 1 for queue status only
    - name: start
      type: integer
      description: First entry (0-based)
    - name: end
      type: integer
      description: Last entry

- id: playlist_delete
  label: Delete Track
  kind: action
  command: "GET /Delete?id={position}"
  params:
    - name: position
      type: integer
      description: Track position in queue

- id: playlist_move
  label: Move Track
  kind: action
  command: "GET /Move?new={destination}&old={origin}"
  params:
    - name: destination
      type: integer
      description: New track position
    - name: origin
      type: integer
      description: Old track position

- id: playlist_clear
  label: Clear Queue
  kind: action
  command: "GET /Clear"
  params: []

- id: playlist_save
  label: Save Queue as Playlist
  kind: action
  command: "GET /Save?name={playlist_name}"
  params:
    - name: playlist_name
      type: string
      description: Name for saved playlist

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
      description: Preset id number, or +1 for next, -1 for previous

- id: browse
  label: Browse Music Content
  kind: query
  command: "GET /Browse?key={key_value}&withContextMenuItems={context}"
  params:
    - name: key_value
      type: string
      description: URL-encoded browse key
    - name: context
      type: integer
      description: 1 to include inline context menu

- id: search
  label: Search Music Content
  kind: query
  command: "GET /Browse?key={key_value}&q={searchText}"
  params:
    - name: key_value
      type: string
      description: URL-encoded search key from prior response
    - name: searchText
      type: string
      description: Search string

- id: group_add_slave
  label: Group One Player
  kind: action
  command: "GET /AddSlave?slave={secondaryPlayerIP}&port={port}&group={group}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: IP of secondary player
    - name: port
      type: integer
      description: Secondary player port (default 11000)
    - name: group
      type: string
      description: Optional group name

- id: group_add_multi
  label: Group Multiple Players
  kind: action
  command: "GET /AddSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated secondary IPs
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated secondary ports

- id: group_remove_slave
  label: Remove One Player from Group
  kind: action
  command: "GET /RemoveSlave?slave={secondaryPlayerIP}&port={port}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: IP of secondary to remove
    - name: port
      type: integer
      description: Port of secondary to remove

- id: group_remove_multi
  label: Remove Multiple Players from Group
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
  command: "POST /reboot with body yes=1"
  params: []

- id: doorbell
  label: Play Doorbell Chime
  kind: action
  command: "GET /Doorbell?play=1"
  params: []

- id: radio_browse_capture
  label: List Capture Inputs
  kind: query
  command: "GET /RadioBrowse?service=Capture"
  params: []

- id: input_select_active
  label: Active Input Selection
  kind: action
  command: "GET /Play?url={URL_value}"
  params:
    - name: URL_value
      type: string
      description: URL from /RadioBrowse?service=Capture response

- id: input_select_external_legacy
  label: External Input Selection (firmware v3.8.0 - v4.2.0)
  kind: action
  command: "GET /Play?inputIndex={IndexId}"
  params:
    - name: IndexId
      type: integer
      description: 1-based input index (Bluetooth excluded); uses /Settings?id=capture&schemaVersion=32

- id: input_select_external_v4
  label: External Input Selection (firmware v4.2.0+)
  kind: action
  command: "GET /Play?inputTypeIndex={typeIndex}"
  params:
    - name: typeIndex
      type: string
      description: "{type}-{index}" e.g. spdif-2, analog-1, coax-1, bluetooth-1, arc-1, earc-1, phono-1, computer-1, aesebu-1, balanced-1, microphone-1

- id: settings_capture
  label: Capture Settings
  kind: query
  command: "GET /Settings?id=capture&schemaVersion=32"
  params: []

- id: bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  command: "GET /audiomodes?bluetoothAutoplay={value}"
  params:
    - name: value
      type: integer
      description: 0 = Manual, 1 = Automatic, 2 = Guest, 3 = Disabled
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [rebooting, online]
  source: derived from /reboot response ("Rebooting. Please close this window.")
# UNRESOLVED: discrete power-on/off not exposed via this API; only reboot

- id: playback_state
  type: enum
  values: [play, pause, stop, stream, connecting]
  source: /Status response <state> element

- id: volume
  type: integer
  range: [0, 100]
  source: /Status <volume>; -1 = fixed volume

- id: volume_db
  type: number
  source: /Status <db>; configured range typically -80..0

- id: mute
  type: boolean
  source: /Status <mute> 1=muted, 0=unmuted

- id: shuffle
  type: boolean
  source: /Status <shuffle>

- id: repeat
  type: enum
  values: [queue, track, off]
  source: /Status <repeat> 0/1/2

- id: current_track
  type: object
  source: /Status title1/title2/title3, album, artist, name, song, totlen, secs

- id: sync_stat
  type: string
  source: /Status <syncStat> or /SyncStatus attribute; changes when SyncStatus changes

- id: sync_volume
  type: integer
  source: /SyncStatus volume 0..100, -1 = fixed

- id: sync_mute
  type: boolean
  source: /SyncStatus mute

- id: group_state
  type: object
  source: /SyncStatus group, master, slave elements

- id: doorbell_status
  type: object
  source: /Doorbell response <status enable volume chime>

- id: playlist_summary
  type: object
  source: /Playlist response <playlist id length modified name>

- id: preset_list
  type: array
  source: /Presets response <preset id name url image>

- id: browse_tree
  type: object
  source: /Browse response <browse> with <item>/<category>

- id: input_inventory
  type: object
  source: /RadioBrowse?service=Capture response <radiotime> with <item>/<remoteitem>
```

## Variables
```yaml
# Discrete settable parameters with their own actions are listed above; no additional continuous variables.
```

## Events
```yaml
# UNRESOLVED: source describes long-polling as a polling technique, not unsolicited push events.
# No explicit event subscription / push notification API in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing.
# /reboot triggers a soft reboot; no destructive commands in source.
```

## Notes
- All requests are HTTP GET (except /reboot which is HTTP POST) to `http://<player_ip>:11000/<request>`.
- Responses are UTF-8 encoded XML.
- Port discovery via mDNS service types `musc.tcp` and `musp.tcp` (LSDP on UDP 11430 is the alternative discovery protocol).
- Without long-polling, polling rate limited to one request per 30s minimum.
- Long-polling parameters: timeout (seconds), etag (opaque hash from prior response root element attribute).
- /Status and /SyncStatus are separate endpoints; /Status for playback, /SyncStatus for volume/grouping.
- /Volume supports four param variants: `level`, `mute`, `abs_db`, `db` (relative).
- `tell_slaves` parameter on /Volume and grouping endpoints controls cascade to grouped players.
- /Repeat states: 0=queue, 1=track, 2=off (matches /Status <repeat>).
- /Action endpoint takes service and action from <action> element URLs in /Status response (for streaming radio skip/love/ban).
- Input selection has two firmware variants: `/Play?inputIndex=N` (v3.8.0 - v4.2.0) and `/Play?inputTypeIndex={type}-{idx}` (v4.2.0+). Bluetooth excluded from inputIndex variant.
- /Bluetooth mode: 0=Manual, 1=Automatic, 2=Guest, 3=Disabled.
- LSDP discovery (Appendix 13.1) is a separate UDP broadcast protocol on port 11430, not part of control plane.
- Source states "BluOS players" generally; CI580 exception uses 11000/11010/11020/11030. C446 firmware-specific port behavior not stated in source.

<!-- UNRESOLVED: firmware version compatibility not stated in source for C446 specifically. -->
<!-- UNRESOLVED: authentication credentials or token formats not documented in source; assume LAN-only / no auth. -->

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-07-14T20:14:45.901Z
last_checked_at: 2026-09-13T22:16:55.666Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-13T22:16:55.666Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec actions have literal source counterparts; transport port 11000 verified; source command catalogue fully represented. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source uses NAD C446 as target but API is the generic BluOS Custom Integration API shared with Bluesound/DALI products; model-specific quirks not stated."
- "discrete power-on/off not exposed via this API; only reboot"
- "source describes long-polling as a polling technique, not unsolicited push events."
- "no multi-step sequences described in source."
- "source contains no safety warnings, interlocks, or power-on sequencing."
- "firmware version compatibility not stated in source for C446 specifically."
- "authentication credentials or token formats not documented in source; assume LAN-only / no auth."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
