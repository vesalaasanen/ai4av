---
spec_id: admin/nad-electronics-c-3050-le-stereophonic-amplifier
schema_version: ai4av-public-spec-v1
revision: 1
title: "NAD Electronics C 3050 Le Stereophonic Amplifier Control Spec"
manufacturer: NAD
model_family: "C 3050 Le Stereophonic Amplifier"
aliases: []
compatible_with:
  manufacturers:
    - NAD
    - "NAD Electronics"
  models:
    - "C 3050 Le Stereophonic Amplifier"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - nad.de
  - bluesoundprofessional.com
  - support.bluos.net
source_urls:
  - https://nad.de/wp-content/uploads/2021/01/Custom-Integration-API-v1.0_Dec_2020.pdf
  - https://bluesoundprofessional.com/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://support.bluos.net/hc/en-us
retrieved_at: 2026-08-09T06:07:28.945Z
last_checked_at: 2026-10-07T13:25:10.223Z
generated_at: 2026-10-07T13:25:10.223Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "known protocol was reported as RS-232C but the refined source describes only BluOS HTTP API and LSDP UDP discovery. No serial protocol is documented in the source."
  - "source describes long-polling via /Status and /SyncStatus timeouts/etags as the change-detection mechanism; no explicit push/event channel documented."
  - "source does not document multi-step sequences as macros."
  - "source contains no safety warnings or interlock procedures."
  - "firmware version compatibility not stated; RS-232C protocol from the known-protocol hint is not represented anywhere in the refined source."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:25:10.223Z
  matched_actions: 40
  action_count: 40
  confidence: medium
  summary: "All 40 action units (34 actions + 6 query feedbacks) match the generic BluOS CI API source; transport matches; catalogue fully covered. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-09
---

# NAD Electronics C 3050 Le Stereophonic Amplifier Control Spec

## Summary
The NAD C 3050 Le Stereophonic Amplifier is a BluOS-enabled streaming amplifier. This spec covers the BluOS Custom Integration API: HTTP GET requests sent to the player that return UTF-8 encoded XML responses. Control covers playback, volume, queue management, presets, content browsing, and player grouping; service discovery uses both mDNS and LSDP (UDP broadcast on port 11430).

<!-- UNRESOLVED: known protocol was reported as RS-232C but the refined source describes only BluOS HTTP API and LSDP UDP discovery. No serial protocol is documented in the source. -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  base_url: http://<player_ip>:11000/<request>
  port: 11000
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
# - powerable       (play/stop commands present; explicit power on/off not documented)
# - routable        (inputType/index selection present; inferred from /Play input selection)
# - queryable       (/Status, /SyncStatus, /Playlist, /Presets queries present)
# - levelable       (/Volume level=0-100, abs_db, db controls present)
```

## Actions
```yaml
- id: status_query
  label: Playback Status Query
  kind: query
  command: "GET /Status?timeout={seconds}&etag={etag-value}"
  params:
    - name: timeout
      type: integer
      description: Optional long-polling timeout in seconds (recommended 100)
    - name: etag
      type: string
      description: Optional etag from previous /Status response for long-polling
- id: sync_status_query
  label: Player and Group Status Query
  kind: query
  command: "GET /SyncStatus?timeout={seconds}&etag={etag-value}"
  params:
    - name: timeout
      type: integer
      description: Optional long-polling timeout in seconds (recommended 180)
    - name: etag
      type: string
      description: Optional etag from previous /SyncStatus response for long-polling
- id: set_volume_level
  label: Set Volume (0-100)
  kind: action
  command: "GET /Volume?level={level}&tell_slaves={on_off}"
  params:
    - name: level
      type: integer
      description: Absolute volume level (0-100)
    - name: tell_slaves
      type: integer
      description: 0 = only this player; 1 = apply to all grouped players
- id: set_volume_abs_db
  label: Set Volume (absolute dB)
  kind: action
  command: "GET /Volume?abs_db={db}&tell_slaves={on_off}"
  params:
    - name: abs_db
      type: number
      description: Absolute volume in dB
    - name: tell_slaves
      type: integer
      description: 0 = only this player; 1 = apply to all grouped players
- id: set_volume_relative_db
  label: Adjust Volume (relative dB)
  kind: action
  command: "GET /Volume?db={delta-db}&tell_slaves={on_off}"
  params:
    - name: db
      type: number
      description: Signed dB delta to apply
    - name: tell_slaves
      type: integer
      description: 0 = only this player; 1 = apply to all grouped players
- id: set_mute
  label: Set Mute
  kind: action
  command: "GET /Volume?mute={on_off}&tell_slaves={on_off}"
  params:
    - name: mute
      type: integer
      description: 0 = mute; 1 = unmute
    - name: tell_slaves
      type: integer
      description: 0 = only this player; 1 = apply to all grouped players
- id: play
  label: Play
  kind: action
  command: "GET /Play"
  params: []
- id: play_seek
  label: Play (seek)
  kind: action
  command: "GET /Play?seek={seconds}"
  params:
    - name: seek
      type: integer
      description: Jump to position in seconds within current track (only valid if /Status includes totlen)
- id: play_input
  label: Play (select input)
  kind: action
  command: "GET /Play?inputType={inputType}&index={index_num}"
  params:
    - name: inputType
      type: string
      description: Input type (analog, spdif, hdmi, bluetooth)
    - name: index
      type: integer
      description: Input number of specified type (default 1)
- id: pause
  label: Pause
  kind: action
  command: "GET /Pause"
  params: []
- id: pause_toggle
  label: Pause (toggle)
  kind: action
  command: "GET /Pause?toggle=1"
  params: []
- id: stop
  label: Stop
  kind: action
  command: "GET /Stop"
  params: []
- id: skip
  label: Skip
  kind: action
  command: "GET /Skip"
  params: []
- id: back
  label: Back
  kind: action
  command: "GET /Back"
  params: []
- id: shuffle
  label: Shuffle
  kind: action
  command: "GET /Shuffle?state={0|1}"
  params:
    - name: state
      type: integer
      description: 0 = disable shuffle; 1 = enable shuffle
- id: repeat
  label: Repeat
  kind: action
  command: "GET /Repeat?state={0|1|2}"
  params:
    - name: state
      type: integer
      description: 0 = repeat queue; 1 = repeat track; 2 = repeat off
- id: radio_action
  label: Streaming Radio Action
  kind: action
  command: "GET /Action?service={service-name}&{action-URL}"
  params:
    - name: service
      type: string
      description: Music service id (e.g. Slacker)
    - name: action-URL
      type: string
      description: Action URL from <action> element (skip / back / love / ban)
- id: playlist_query
  label: List Tracks
  kind: query
  command: "GET /Playlist?length=1"
  params:
    - name: length
      type: integer
      description: Return only top-level attributes (omit for full track listing)
- id: playlist_range
  label: List Tracks (range)
  kind: query
  command: "GET /Playlist?start={first}&end={last}"
  params:
    - name: start
      type: integer
      description: First entry index (starting from 0)
    - name: end
      type: integer
      description: Last entry index (inclusive)
- id: delete_track
  label: Delete Track
  kind: action
  command: "GET /Delete?id={position}"
  params:
    - name: id
      type: integer
      description: Track id to delete from current queue
- id: clear_queue
  label: Clear Queue
  kind: action
  command: "GET /Clear"
  params: []
- id: save_queue
  label: Save Queue
  kind: action
  command: "GET /Save?name={playlist_name}"
  params:
    - name: name
      type: string
      description: Name for the saved BluOS playlist
- id: presets_list
  label: List Presets
  kind: query
  command: "GET /Presets"
  params: []
- id: preset_load
  label: Load Preset
  kind: action
  command: "GET /Preset?id={presetId|+1|-1}"
  params:
    - name: id
      type: string
      description: Preset id to load; +1 for next preset, -1 for previous
- id: browse
  label: Browse Content
  kind: query
  command: "GET /Browse?key={key-value}"
  params:
    - name: key
      type: string
      description: Optional browseKey / nextKey / parentKey / contextMenuKey from earlier response (omit for top-level browse)
- id: search
  label: Search Content
  kind: query
  command: "GET /Browse?key={key-value}&q={searchText}"
  params:
    - name: key
      type: string
      description: searchKey from earlier response
    - name: q
      type: string
      description: Search string
- id: add_slave
  label: Group Two Players
  kind: action
  command: "GET /AddSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: slave
      type: string
      description: IP address of secondary player
    - name: port
      type: integer
      description: Port of secondary player (default 11000)
- id: add_slaves
  label: Group Multiple Players
  kind: action
  command: "GET /AddSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: slaves
      type: string
      description: Comma-separated secondary player IPs
    - name: ports
      type: string
      description: Comma-separated secondary player ports
- id: remove_slave
  label: Remove One Player From Group
  kind: action
  command: "GET /RemoveSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: slave
      type: string
      description: IP of secondary player to remove
    - name: port
      type: integer
      description: Port of secondary player to remove
- id: remove_slaves
  label: Remove Multiple Players From Group
  kind: action
  command: "GET /RemoveSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: slaves
      type: string
      description: Comma-separated secondary player IPs
    - name: ports
      type: string
      description: Comma-separated secondary player ports
- id: lsdp_query
  label: LSDP Service Query
  kind: action
  command: "LSDP Query (UDP broadcast, port 11430, message type Q=0x51 or R=0x52)"
  params:
    - name: classes
      type: string
      description: 16-bit class identifiers to query
- id: lsdp_announce
  label: LSDP Service Announce
  kind: action
  command: "LSDP Announce (UDP broadcast, port 11430, message type A=0x41)"
  params: []
- id: lsdp_delete
  label: LSDP Service Delete
  kind: action
  command: "LSDP Delete (UDP broadcast, port 11430, message type D=0x44)"
  params: []
- id: input_types_query
  label: Input Types Query
  kind: query
  command: "/RadioBrowse?service=Capture"
  params:
    - name: service
      type: string
      description: Fixed value Capture; response provides inputType attributes
```

## Feedbacks
```yaml
- id: status_response
  type: object
  values: [album, artist, state, volume, mute, db, mode, shuffle, repeat, song, totlen, secs, pid, prid, quality, service, title1, title2, title3, streamFormat, syncStat]
  query_command: "/Status"
- id: sync_status_response
  type: object
  values: [brand, model, modelName, name, volume, mute, db, group, id, mac, schemaVersion, etag, syncStat]
  query_command: "/SyncStatus"
- id: volume_response
  type: object
  values: [volume, db, mute, muteDb, muteVolume, etag, offsetDb]
  query_command: "/Volume"
- id: playlist_response
  type: object
  values: [id, name, length, modified, shuffle, repeat, song]
  query_command: "/Playlist"
- id: presets_response
  type: object
  values: [prid, name, id, url]
  query_command: "/Presets"
- id: browse_response
  type: object
  values: [sid, service, serviceName, serviceIcon, searchKey, nextKey, parentKey, type]
  query_command: "/Browse"
- id: action_skip_response
  type: enum
  values: [skip]
- id: action_back_response
  type: enum
  values: [back]
- id: action_love_response
  type: enum
  values: [love_1]
- id: action_ban_response
  type: enum
  values: [love_skip_1]
- id: add_slave_response
  type: object
  values: [slave_port, slave_id]
- id: remove_slave_response
  type: object
  values: [slave_port, slave_id]
```

## Variables
```yaml
- name: level
  type: integer
  description: Player volume 0-100 (-1 means fixed volume)
- name: db
  type: number
  description: Volume in dB; typical range bottom is -80.0
- name: mute
  type: integer
  description: Mute state (0 = muted, 1 = unmuted)
- name: state
  type: string
  description: Player state: play, pause, stop, stream, connecting, etc.
- name: shuffle
  type: integer
  description: Shuffle state (0 or 1)
- name: repeat
  type: integer
  description: Repeat state (0 = queue, 1 = track, 2 = off)
```

## Events
```yaml
# UNRESOLVED: source describes long-polling via /Status and /SyncStatus timeouts/etags as the change-detection mechanism; no explicit push/event channel documented.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences as macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures.
```

## Notes
- Source is the BluOS Custom Integration API. Known protocol was reported as RS-232C but the refined document does not contain any serial/R-232 content; only HTTP (port 11000) and LSDP UDP (port 11430) are documented.
- The C 3050 LE is a BluOS-equipped product; the API in the source applies generically to BluOS players. The CI580 is the only documented exception (multi-node, ports 11000/11010/11020/11030).
- Long-polling is the recommended change-detection mechanism. Clients should restrict regular polling to at most one request every 30 seconds.
- mDNS service types referenced: musc.tcp (BluOS Player, 0x0001), muss.tcp (BluOS Server, 0x0002), musp.tcp (BluOS Player secondary, 0x0003), sovi-mfg.tcp (manufacturing, 0x0004).
- LSDP magic word: ASCII bytes "LSDP". LSDP protocol version: 1.

<!-- UNRESOLVED: firmware version compatibility not stated; RS-232C protocol from the known-protocol hint is not represented anywhere in the refined source. -->

## Provenance

```yaml
source_domains:
  - nad.de
  - bluesoundprofessional.com
  - support.bluos.net
source_urls:
  - https://nad.de/wp-content/uploads/2021/01/Custom-Integration-API-v1.0_Dec_2020.pdf
  - https://bluesoundprofessional.com/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://support.bluos.net/hc/en-us
retrieved_at: 2026-08-09T06:07:28.945Z
last_checked_at: 2026-10-07T13:25:10.223Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:25:10.223Z
matched_actions: 40
action_count: 40
confidence: medium
summary: "All 40 action units (34 actions + 6 query feedbacks) match the generic BluOS CI API source; transport matches; catalogue fully covered. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "known protocol was reported as RS-232C but the refined source describes only BluOS HTTP API and LSDP UDP discovery. No serial protocol is documented in the source."
- "source describes long-polling via /Status and /SyncStatus timeouts/etags as the change-detection mechanism; no explicit push/event channel documented."
- "source does not document multi-step sequences as macros."
- "source contains no safety warnings or interlock procedures."
- "firmware version compatibility not stated; RS-232C protocol from the known-protocol hint is not represented anywhere in the refined source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
