---
spec_id: admin/nad-t785-bluos
schema_version: ai4av-public-spec-v1
revision: 1
title: "NAD T785 BluOS Control Spec"
manufacturer: NAD
model_family: "NAD T785"
aliases: []
compatible_with:
  manufacturers:
    - NAD
  models:
    - "NAD T785"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-06-12T02:46:56.700Z
last_checked_at: 2026-06-12T19:27:38.652Z
generated_at: 2026-06-12T19:27:38.652Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not name NAD T785 explicitly; RS-232C was listed as known protocol but source documents HTTP and UDP only, not RS-232."
  - "source documents no settable scalar parameters beyond the action commands above."
  - "source does not document unsolicited event notifications. Long-polling on /Status or /SyncStatus is the only state-change mechanism described."
  - "source does not define multi-step macro sequences."
  - "source contains no safety warnings, interlocks, or power-on sequencing requirements."
  - "firmware compatibility ranges, NAD T785-specific quirks, and any device-level safety interlocks."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:27:38.652Z
  matched_actions: 51
  action_count: 51
  confidence: medium
  summary: "All 51 spec actions confirmed verbatim in the source; transport port 11000 and HTTP protocol supported; source coverage is complete with no extra unrepresented commands. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# NAD T785 BluOS Control Spec

## Summary
Control spec for NAD T785 A/V receiver via the BluOS API, an HTTP/JSON-XML control surface used across NAD, Bluesound, and DALI products. Covers status queries, playback, volume, queue management, presets, browsing, grouping, input selection, Bluetooth mode, and LSDP UDP-broadcast discovery. Note: source document is the generic BluOS API Control Protocol — the NAD T785 is listed in `compatible_with` based on NAD BluOS support, but the T785 model is not explicitly named in the source.

<!-- UNRESOLVED: source does not name NAD T785 explicitly; RS-232C was listed as known protocol but source documents HTTP and UDP only, not RS-232. -->

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
- powerable       # inferred: /reboot command present; no explicit power on/off documented
- routable        # inferred: input/source selection commands present
- queryable       # inferred: /Status, /SyncStatus, /Playlist, /Presets queries present
- levelable       # inferred: /Volume set/+/− and mute commands present
```

## Actions
```yaml
# Status
- id: status
  label: Get Playback Status
  kind: query
  command: "GET /Status"
  params: []
- id: status_long_poll
  label: Get Playback Status (Long Polling)
  kind: query
  command: "GET /Status?timeout={seconds}&etag={etag}"
  params:
    - name: timeout
      type: integer
      description: Long-poll duration in seconds (recommended 100, 60..never faster than 10)
    - name: etag
      type: string
      description: Etag from previous /Status response
- id: sync_status
  label: Get Player and Group Sync Status
  kind: query
  command: "GET /SyncStatus"
  params: []
- id: sync_status_long_poll
  label: Get Sync Status (Long Polling)
  kind: query
  command: "GET /SyncStatus?timeout={seconds}&etag={etag}"
  params:
    - name: timeout
      type: integer
      description: Polling interval in seconds (recommended 180)
    - name: etag
      type: string
      description: Etag from previous /SyncStatus response

# Volume
- id: volume_set
  label: Set Volume (0..100)
  kind: action
  command: "GET /Volume?level={level}&tell_slaves={on_off}"
  params:
    - name: level
      type: integer
      description: Absolute volume 0..100
    - name: tell_slaves
      type: integer
      description: 0 = this player only, 1 = propagate to group
- id: volume_mute_set
  label: Set Mute State
  kind: action
  command: "GET /Volume?mute={on_off}&tell_slaves={on_off}"
  params:
    - name: mute
      type: integer
      description: 0 = mute, 1 = unmute
    - name: tell_slaves
      type: integer
      description: 0 = this player only, 1 = propagate to group
- id: volume_set_db
  label: Set Volume (Absolute dB)
  kind: action
  command: "GET /Volume?abs_db={db}&tell_slaves={on_off}"
  params:
    - name: abs_db
      type: number
      description: Absolute volume in dB
    - name: tell_slaves
      type: integer
      description: 0 or 1
- id: volume_db_delta
  label: Adjust Volume (Relative dB)
  kind: action
  command: "GET /Volume?db={delta_db}&tell_slaves={on_off}"
  params:
    - name: db
      type: number
      description: Relative dB delta (positive or negative)
    - name: tell_slaves
      type: integer
      description: 0 or 1
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

# Playback
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
    - name: seek
      type: integer
      description: Position in current track in seconds
- id: play_seek_id
  label: Play Track with Seek
  kind: action
  command: "GET /Play?seek={seconds}&id={trackid}"
  params:
    - name: seek
      type: integer
      description: Position in seconds
    - name: id
      type: integer
      description: Track id in queue
- id: play_url
  label: Play Stream URL
  kind: action
  command: "GET /Play?url={encodedStreamURL}"
  params:
    - name: url
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
      description: 0 = repeat queue, 1 = repeat track, 2 = repeat off
- id: radio_action
  label: Streaming Radio Action (skip/love/ban)
  kind: action
  command: "GET /Action?service={service}&{action}={id}"
  params:
    - name: service
      type: string
      description: Music service name (e.g. Slacker)
    - name: action
      type: string
      description: Action name (skip, love, ban, back)

# Play Queue
- id: playlist
  label: List Play Queue
  kind: query
  command: "GET /Playlist"
  params: []
- id: playlist_status
  label: Play Queue Status
  kind: query
  command: "GET /Playlist?length=1"
  params: []
- id: playlist_range
  label: Play Queue Range
  kind: query
  command: "GET /Playlist?start={first}&end={last}"
  params:
    - name: start
      type: integer
      description: First entry (0-based)
    - name: last
      type: integer
      description: Last entry
- id: delete_track
  label: Delete Track from Queue
  kind: action
  command: "GET /Delete?id={position}"
  params:
    - name: id
      type: integer
      description: Track position in queue
- id: move_track
  label: Move Track in Queue
  kind: action
  command: "GET /Move?new={destination}&old={origin}"
  params:
    - name: new
      type: integer
      description: New position
    - name: old
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
    - name: name
      type: string
      description: Saved playlist name

# Presets
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
      type: integer
      description: Preset id
- id: preset_next
  label: Load Next Preset
  kind: action
  command: "GET /Preset?id=+1"
  params: []
- id: preset_previous
  label: Load Previous Preset
  kind: action
  command: "GET /Preset?id=-1"
  params: []

# Browsing & Search
- id: browse
  label: Browse
  kind: query
  command: "GET /Browse"
  params: []
- id: browse_key
  label: Browse at Key
  kind: query
  command: "GET /Browse?key={key-value}"
  params:
    - name: key
      type: string
      description: URL-encoded key from prior response
- id: browse_with_context
  label: Browse with Inline Context Menu
  kind: query
  command: "GET /Browse?key={key-value}&withContextMenuItems=1"
  params:
    - name: key
      type: string
      description: URL-encoded key
- id: search
  label: Search Music Content
  kind: query
  command: "GET /Browse?key={key-value}&q={searchText}"
  params:
    - name: key
      type: string
      description: URL-encoded searchKey from prior response
    - name: q
      type: string
      description: Search string

# Grouping
- id: add_slave
  label: Group One Secondary Player
  kind: action
  command: "GET /AddSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}&group={GroupName}"
  params:
    - name: slave
      type: string
      description: IP of secondary player
    - name: port
      type: integer
      description: Port of secondary player (default 11000)
    - name: group
      type: string
      description: Optional group name
- id: add_slaves
  label: Group Multiple Secondary Players
  kind: action
  command: "GET /AddSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: slaves
      type: string
      description: Comma-separated secondary IPs
    - name: ports
      type: string
      description: Comma-separated ports
- id: remove_slave
  label: Ungroup One Player
  kind: action
  command: "GET /RemoveSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: slave
      type: string
      description: IP of secondary player
    - name: port
      type: integer
      description: Port of secondary player
- id: remove_slaves
  label: Ungroup Multiple Players
  kind: action
  command: "GET /RemoveSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: slaves
      type: string
      description: Comma-separated secondary IPs
    - name: ports
      type: string
      description: Comma-separated ports

# Player control
- id: reboot
  label: Soft Reboot Player
  kind: action
  command: "POST /reboot"
  params:
    - name: yes
      type: string
      description: Any value (e.g. 1)

# Doorbell
- id: doorbell
  label: Play Doorbell Chime
  kind: action
  command: "GET /Doorbell?play=1"
  params: []

# Input Selection
- id: input_play_url
  label: Select Active Input (by URL)
  kind: action
  command: "GET /Play?url={URL_value}"
  params:
    - name: url
      type: string
      description: URL attribute from /RadioBrowse?service=Capture response
- id: radio_browse_capture
  label: List Capture Inputs
  kind: query
  command: "GET /RadioBrowse?service=Capture"
  params: []
- id: input_legacy
  label: Select External Input (firmware <3.8.0..<4.2.0)
  kind: action
  command: "GET /Play?inputIndex={IndexId}"
  params:
    - name: inputIndex
      type: integer
      description: 1-based input index from /Settings?id=capture
- id: input_type_index
  label: Select External Input (firmware ≥4.2.0)
  kind: action
  command: "GET /Play?inputTypeIndex={type-index}"
  params:
    - name: inputTypeIndex
      type: string
      description: "{type}-{index}" e.g. spdif-2. Types: spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone
- id: settings_capture
  label: Get Capture Settings
  kind: query
  command: "GET /Settings?id=capture&schemaVersion=32"
  params: []

# Bluetooth
- id: bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  command: "GET /audiomodes?bluetoothAutoplay={value}"
  params:
    - name: bluetoothAutoplay
      type: integer
      description: 0 = Manual, 1 = Automatic, 2 = Guest, 3 = Disabled
```

## Feedbacks
```yaml
- id: playback_state
  type: enum
  values: [play, pause, stop, stream, connecting]
- id: mute
  type: enum
  values: [muted, unmuted]
- id: volume_level
  type: integer
  description: Player volume 0..100 (-1 = fixed)
- id: volume_db
  type: number
  description: Player volume in dB
- id: repeat_state
  type: enum
  values: [repeat_queue, repeat_track, repeat_off]
- id: shuffle_state
  type: enum
  values: [off, on]
- id: quality
  type: string
  description: cd, hd, dolbyAudio, mqa, mqaAuthored, or numeric bitrate
- id: track_id
  type: integer
  description: Current track position in queue (song)
- id: queue_length
  type: integer
  description: Total tracks in current queue
- id: player_name
  type: string
- id: player_brand
  type: string
- id: player_model
  type: string
- id: group_name
  type: string
- id: doorbell_status
  type: object
  description: enable, volume, chime
```

## Variables
```yaml
# UNRESOLVED: source documents no settable scalar parameters beyond the action commands above.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited event notifications. Long-polling on /Status or /SyncStatus is the only state-change mechanism described.
```

## Macros
```yaml
# UNRESOLVED: source does not define multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing requirements.
```

## Notes
- Transport is HTTP on port 11000; UDP broadcast on port 11430 for LSDP discovery. Source does not document RS-232C control for NAD T785, despite `Known protocol: RS-232C` in the input.
- All API requests are HTTP GET; reboot is the only POST. Responses are UTF-8 encoded XML unless otherwise noted.
- Long-polling: keep open `/Status` or `/SyncStatus` with `timeout` and `etag` params. Recommended intervals: 100s for /Status, 180s for /SyncStatus. Never poll faster than 10s.
- Without long-polling, restrict polling to once per 30 seconds.
- LSDP discovery uses UDP broadcast on port 11430 (registered with IANA to Lenbrook). mDNS service types: `_musc._tcp` (BluOS Player), `_muss._tcp` (Server), `_musp._tcp` (secondary), `_musz._tcp` (pair slave), `_mush._tcp` (Hub).
- Source does not name NAD T785 explicitly; spec assumes T785 implements the BluOS API as a primary player.
<!-- UNRESOLVED: firmware compatibility ranges, NAD T785-specific quirks, and any device-level safety interlocks. -->

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-06-12T02:46:56.700Z
last_checked_at: 2026-06-12T19:27:38.652Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:27:38.652Z
matched_actions: 51
action_count: 51
confidence: medium
summary: "All 51 spec actions confirmed verbatim in the source; transport port 11000 and HTTP protocol supported; source coverage is complete with no extra unrepresented commands. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not name NAD T785 explicitly; RS-232C was listed as known protocol but source documents HTTP and UDP only, not RS-232."
- "source documents no settable scalar parameters beyond the action commands above."
- "source does not document unsolicited event notifications. Long-polling on /Status or /SyncStatus is the only state-change mechanism described."
- "source does not define multi-step macro sequences."
- "source contains no safety warnings, interlocks, or power-on sequencing requirements."
- "firmware compatibility ranges, NAD T785-specific quirks, and any device-level safety interlocks."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
