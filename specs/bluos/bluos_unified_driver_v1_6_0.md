---
spec_id: admin/bluos-unified-driver-v1-6-0
schema_version: ai4av-public-spec-v1
revision: 1
title: "BluOS Unified Driver v1.6.0 Control Spec"
manufacturer: BluOS
model_family: "BluOS Unified Driver v1.6.0"
aliases: []
compatible_with:
  manufacturers:
    - BluOS
  models:
    - "BluOS Unified Driver v1.6.0"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-08-24T06:01:46.885Z
last_checked_at: 2026-08-24T22:16:27.042Z
generated_at: 2026-08-24T22:16:27.042Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware compatibility ranges for individual endpoints are documented (e.g. /Play?inputIndex is only valid for BluOS firmware newer than v3.8.0 and older than v4.2.0, /Play?inputTypeIndex requires v4.2.0+) but not consolidated for the unified driver; concrete device model coverage beyond \"BluOS players\" is not enumerated in the source."
  - "explicit power on/off not documented; /reboot is soft reboot, not power control"
  - "source documents discrete command-driven settings (volume level, mute, repeat,"
  - "source does not document unsolicited push notifications beyond the long-polling"
  - "no multi-step macro sequences described in source."
  - "no explicit safety warnings, electrical interlocks, or power-on sequencing"
  - "Concrete device model coverage (Bluesound NODE, POWERNODE, PULSE, NAD CI580, DALI etc.) and per-model firmware compatibility matrix not stated in source. Per-command response payload schemas beyond those quoted (status, volume, playlist, presets, doorbell, sync, radiotime, settings) are documented as \"ignore undocumented responses\" rather than enumerated. LSDP message block fields beyond Announce/Query/Delete headers are not present in the supplied excerpt."
verification:
  verdict: verified
  checked_at: 2026-08-24T22:16:27.042Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec actions map verbatim to documented HTTP endpoints or LSDP message types in the source; transport parameters (port 11000, UDP11430) are supported; ratio44/31 above 0.9 floor. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-24
---

# BluOS Unified Driver v1.6.0 Control Spec

## Summary
BluOS is an OS / music-management stack found in Bluesound, NAD Electronics, DALI Loudspeakers and other products. This spec covers the Custom Integration HTTP API plus the LSDP (Lenbrook Service Discovery Protocol) UDP discovery protocol documented for BluOS players, including playback, volume, queue, presets, browsing, grouping, reboot, doorbell chime, direct input and Bluetooth-mode control.

<!-- UNRESOLVED: firmware compatibility ranges for individual endpoints are documented (e.g. /Play?inputIndex is only valid for BluOS firmware newer than v3.8.0 and older than v4.2.0, /Play?inputTypeIndex requires v4.2.0+) but not consolidated for the unified driver; concrete device model coverage beyond "BluOS players" is not enumerated in the source. -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  port: 11000  # control API port for BluOS players (CI580 nodes use 11000/11010/11020/11030)
  base_url: http://{player_ip}:{port}  # control API base URL pattern
auth:
  type: none  # inferred: no login/password/auth procedure in source
```

## Traits
```yaml
# - queryable       (inferred from /Status, /Volume, /SyncStatus, /Playlist, /Presets, /RadioBrowse)
# - routable        (inferred from /AddSlave, /RemoveSlave player-grouping commands and /Play?url input switching)
# - levelable       (inferred from /Volume?level, /Volume?db, /Volume?abs_db volume commands)
# - powerable       (inferred from /reboot POST reboot command and Play/Pause/Stop transport state)
powerable: false  # UNRESOLVED: explicit power on/off not documented; /reboot is soft reboot, not power control
queryable: true   # inferred from query command examples
routable: true    # inferred from input/group routing examples
levelable: true   # inferred from volume control examples
```

## Actions
```yaml
- id: status
  label: Playback Status (with optional long-polling)
  kind: query
  command: "GET /Status?timeout={seconds}&etag={etag-value}"
  params:
    - name: timeout
      type: integer
      description: Optional long-poll interval in seconds (recommended 100; min 60; never faster than 10).
    - name: etag-value
      type: string
      description: Optional etag attribute from previous /Status response.
- id: sync_status
  label: Player and Group Sync Status (with optional long-polling)
  kind: query
  command: "GET /SyncStatus?timeout={seconds}&etag={etag-value}"
  params:
    - name: timeout
      type: integer
      description: Optional long-poll interval in seconds (recommended 180).
    - name: etag-value
      type: string
      description: Optional etag attribute from previous /SyncStatus response.
- id: volume_set_level
  label: Set Volume (absolute 0-100)
  kind: action
  command: "GET /Volume?level={level}&tell_slaves={on_off}"
  params:
    - name: level
      type: integer
      description: Absolute volume 0..100.
    - name: tell_slaves
      type: integer
      description: 0 = only this player; 1 = apply to entire group.
- id: volume_set_abs_db
  label: Set Volume (absolute dB)
  kind: action
  command: "GET /Volume?abs_db={db}&tell_slaves={on_off}"
  params:
    - name: db
      type: number
      description: Absolute volume in dB.
    - name: tell_slaves
      type: integer
      description: 0 = only this player; 1 = apply to entire group.
- id: volume_relative_db
  label: Set Volume (relative dB delta)
  kind: action
  command: "GET /Volume?db={delta-db}&tell_slaves={on_off}"
  params:
    - name: delta-db
      type: number
      description: Positive or negative dB delta.
    - name: tell_slaves
      type: integer
      description: 0 = only this player; 1 = apply to entire group.
- id: volume_up
  label: Volume Up (typical +2 dB)
  kind: action
  command: "GET /Volume?db=2"
  params: []
- id: volume_down
  label: Volume Down (typical -2 dB)
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
  label: Play (resume or start)
  kind: action
  command: "GET /Play?seek={seconds}&id={trackid}"
  params:
    - name: seek
      type: integer
      description: Optional. Jump to position in seconds within current track.
    - name: id
      type: integer
      description: Optional. Track id in the queue.
- id: play_url
  label: Play Stream URL
  kind: action
  command: "GET /Play?url={encodedStreamURL}"
  params:
    - name: encodedStreamURL
      type: string
      description: URL-encoded stream URL.
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
  label: Back (previous track or restart current)
  kind: action
  command: "GET /Back"
  params: []
- id: shuffle
  label: Shuffle Queue On/Off
  kind: action
  command: "GET /Shuffle?state={state}"
  params:
    - name: state
      type: integer
      description: 0 = disable shuffle; 1 = enable shuffle.
- id: repeat
  label: Set Repeat Mode
  kind: action
  command: "GET /Repeat?state={state}"
  params:
    - name: state
      type: integer
      description: 0 = repeat queue; 1 = repeat track; 2 = repeat off.
- id: radio_action
  label: Streaming Radio Station Action (skip/back/love/ban)
  kind: action
  command: "GET /Action?service={service-name}&{action-name}={action-id}"
  params:
    - name: service-name
      type: string
      description: Service id (e.g. Slacker).
    - name: action-name
      type: string
      description: One of skip, back, love, ban (with the URL provided by /Status action element).
- id: playlist_list
  label: List Play Queue Tracks (paginated)
  kind: query
  command: "GET /Playlist?start={first}&end={last}"
  params:
    - name: start
      type: integer
      description: First entry (0-based).
    - name: end
      type: integer
      description: Last entry.
- id: playlist_status
  label: Play Queue Status Only
  kind: query
  command: "GET /Playlist?length=1"
  params: []
- id: playlist_delete
  label: Delete Track from Queue
  kind: action
  command: "GET /Delete?id={position}"
  params:
    - name: id
      type: integer
      description: Track id (queue position) to delete.
- id: playlist_move
  label: Move Track in Queue
  kind: action
  command: "GET /Move?new={destination}&old={origin}"
  params:
    - name: new
      type: integer
      description: New queue position.
    - name: old
      type: integer
      description: Old queue position.
- id: playlist_clear
  label: Clear Queue
  kind: action
  command: "GET /Clear"
  params: []
- id: playlist_save
  label: Save Queue as Named Playlist
  kind: action
  command: "GET /Save?name={playlist_name}"
  params:
    - name: name
      type: string
      description: Playlist name (URL-encode spaces).
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
      description: Preset id, +1 for next preset, -1 for previous preset.
- id: browse
  label: Browse Music Content
  kind: query
  command: "GET /Browse?key={key-value}&withContextMenuItems={0|1}"
  params:
    - name: key-value
      type: string
      description: URL-encoded browseKey, nextKey, parentKey, or contextMenuKey.
    - name: withContextMenuItems
      type: integer
      description: 1 to include inline context menu.
- id: search
  label: Search Music Content
  kind: query
  command: "GET /Browse?key={key-value}&q={searchText}"
  params:
    - name: key-value
      type: string
      description: URL-encoded searchKey from prior response.
    - name: q
      type: string
      description: Search string.
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
      description: Port of the secondary player (default 11000; CI580 uses 11000/11010/11020/11030).
    - name: group
      type: string
      description: Optional group name.
- id: group_add_slaves
  label: Group Multiple Secondary Players
  kind: action
  command: "GET /AddSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: slaves
      type: string
      description: Comma-separated IP addresses.
    - name: ports
      type: string
      description: Comma-separated port numbers.
- id: group_remove_slave
  label: Remove One Secondary Player
  kind: action
  command: "GET /RemoveSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: slave
      type: string
      description: IP of the secondary player to remove.
    - name: port
      type: integer
      description: Port of the secondary player to remove.
- id: group_remove_slaves
  label: Remove Multiple Secondary Players
  kind: action
  command: "GET /RemoveSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: slaves
      type: string
      description: Comma-separated IP addresses.
    - name: ports
      type: string
      description: Comma-separated port numbers.
- id: reboot
  label: Soft Reboot Player
  kind: action
  command: "POST /reboot with parameter yes=1"
  params: []
- id: doorbell
  label: Play Doorbell Chime
  kind: action
  command: "GET /Doorbell?play=1"
  params: []
- id: input_select_url
  label: Active Input Selection by URL (HUB inputs)
  kind: action
  command: "GET /Play?url={URL_value}"
  params:
    - name: url
      type: string
      description: URL value from /RadioBrowse?service=Capture response (URL-encoded).
- id: radio_browse_capture
  label: List Active Inputs (Capture service)
  kind: query
  command: "GET /RadioBrowse?service=Capture"
  params: []
- id: input_select_index_legacy
  label: External Input Selection by index (firmware > v3.8.0 and < v4.2.0)
  kind: action
  command: "GET /Play?inputIndex={IndexId}"
  params:
    - name: inputIndex
      type: integer
      description: 1-based index of inputs from /Settings?id=capture&schemaVersion=32 (Bluetooth excluded).
- id: capture_settings
  label: Capture Settings (for legacy inputIndex)
  kind: query
  command: "GET /Settings?id=capture&schemaVersion=32"
  params: []
- id: input_select_type_index
  label: External Input Selection by type-index (firmware v4.2.0+)
  kind: action
  command: "GET /Play?inputTypeIndex={type-index}"
  params:
    - name: type-index
      type: string
      description: "Format {type}-{index}. Types: spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone. Index starts at 1."
- id: bluetooth_mode
  label: Set Bluetooth Autoplay Mode
  kind: action
  command: "GET /audiomodes?bluetoothAutoplay={value}"
  params:
    - name: value
      type: integer
      description: 0 = Manual, 1 = Automatic, 2 = Guest, 3 = Disabled.
- id: lsdp_announce
  label: LSDP Announce (UDP broadcast)
  kind: action
  command: "LSDP Announce packet broadcast to UDP port 11430"
  params: []
- id: lsdp_query
  label: LSDP Query (UDP broadcast)
  kind: action
  command: "LSDP Query packet broadcast to UDP port 11430"
  params: []
- id: lsdp_delete
  label: LSDP Delete (UDP broadcast)
  kind: action
  command: "LSDP Delete packet broadcast to UDP port 11430"
  params: []
```

## Feedbacks
```yaml
- id: volume_state
  type: object
  description: |
    Volume level (0..100 or -1 for fixed) plus dB, mute flag, optional pre-mute level
    (muteDb, muteVolume). Returned by /Volume and embedded in /Status as <volume>.
- id: playback_state
  type: enum
  values: [play, pause, stop, stream, connecting]
  description: Returned by /Status as <state> and by /Play, /Pause, /Stop responses.
- id: shuffle_state
  type: enum
  values: [0, 1]
  description: Returned by /Status as <shuffle> and /Playlist as shuffle attribute.
- id: repeat_state
  type: enum
  values: [0, 1, 2]
  description: 0 = repeat queue, 1 = repeat track, 2 = repeat off. /Status <repeat>, /Playlist repeat attr.
- id: sync_group
  type: object
  description: |
    Group name and member list. Returned by /SyncStatus as <group> and <master>/<slave> elements.
- id: now_playing
  type: object
  description: |
    Album, artist, name, title1/title2/title3, totlen, secs, image, service, quality,
    streamUrl. Returned by /Status.
- id: battery
  type: object
  description: |
    Optional. level (percent), charging (1/0), icon URL. Returned by /Status and /SyncStatus
    when player has a battery pack.
- id: doorbell_status
  type: object
  description: enable, volume, chime audio path. Returned by /Doorbell.
- id: radio_station_action
  type: object
  description: |
    Available radio station actions (skip, back, love, ban) with URLs. Returned as <actions>
    within /Status when a streamUrl is present.
- id: queue_id
  type: integer
  description: pid/prid queue and preset ids returned by /Status, /Playlist, /Presets.
```

## Variables
```yaml
# UNRESOLVED: source documents discrete command-driven settings (volume level, mute, repeat,
# shuffle, input, bluetooth mode) rather than settable parameter variables. No separate
# Variables list is supported by the source.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited push notifications beyond the long-polling
# pattern (which is pull-based). No streaming event subscription protocol is described.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for:
  - reboot  # /reboot is a destructive soft-reboot operation affecting all clients
interlocks: []
# UNRESOLVED: no explicit safety warnings, electrical interlocks, or power-on sequencing
# procedures are described in the source.
```

## Notes
- All HTTP endpoints respond with UTF-8 encoded XML.
- BluOS players use UDP port 11000 (node 1 of CI580) / 11010 / 11020 / 11030 by default; the actual port should be discovered via mDNS services `musc.tcp` and `musp.tcp`.
- Long polling: when not used, polling rate should not exceed one request every 30 seconds. When used, two consecutive requests for the same resource must not be made less than one second apart.
- /Status polling: recommended interval 100 s; never faster than 10 s.
- /SyncStatus polling: recommended interval 180 s.
- External input selection has three documented variants with different firmware requirements:
  - /Play?url=URL_value for active inputs and HUB inputs (always supported).
  - /Play?inputIndex=N for firmware > v3.8.0 and < v4.2.0.
  - /Play?inputTypeIndex={type}-{index} for firmware v4.2.0+.
- LSDP (Lenbrook Service Discovery Protocol) uses UDP broadcast on port 11430, IANA-registered to Lenbrook. Packet header starts with magic "LSDP" (4 ASCII bytes). Protocol version = 1. Startup sends 7 packets at [0, 1, 2, 3, 5, 7, 10s] + (0 to 250ms random). Steady-state Announce period 57s + (0 to 6s random).
- /reboot is a POST (not GET) — every other documented endpoint uses GET.
- "powerable" trait intentionally left false: source documents only soft reboot (/reboot) and playback state transitions (play/pause/stop); no dedicated power-on/off command is described.

<!-- UNRESOLVED: Concrete device model coverage (Bluesound NODE, POWERNODE, PULSE, NAD CI580, DALI etc.) and per-model firmware compatibility matrix not stated in source. Per-command response payload schemas beyond those quoted (status, volume, playlist, presets, doorbell, sync, radiotime, settings) are documented as "ignore undocumented responses" rather than enumerated. LSDP message block fields beyond Announce/Query/Delete headers are not present in the supplied excerpt. -->

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-08-24T06:01:46.885Z
last_checked_at: 2026-08-24T22:16:27.042Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-24T22:16:27.042Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec actions map verbatim to documented HTTP endpoints or LSDP message types in the source; transport parameters (port 11000, UDP11430) are supported; ratio44/31 above 0.9 floor. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware compatibility ranges for individual endpoints are documented (e.g. /Play?inputIndex is only valid for BluOS firmware newer than v3.8.0 and older than v4.2.0, /Play?inputTypeIndex requires v4.2.0+) but not consolidated for the unified driver; concrete device model coverage beyond \"BluOS players\" is not enumerated in the source."
- "explicit power on/off not documented; /reboot is soft reboot, not power control"
- "source documents discrete command-driven settings (volume level, mute, repeat,"
- "source does not document unsolicited push notifications beyond the long-polling"
- "no multi-step macro sequences described in source."
- "no explicit safety warnings, electrical interlocks, or power-on sequencing"
- "Concrete device model coverage (Bluesound NODE, POWERNODE, PULSE, NAD CI580, DALI etc.) and per-model firmware compatibility matrix not stated in source. Per-command response payload schemas beyond those quoted (status, volume, playlist, presets, doorbell, sync, radiotime, settings) are documented as \"ignore undocumented responses\" rather than enumerated. LSDP message block fields beyond Announce/Query/Delete headers are not present in the supplied excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
