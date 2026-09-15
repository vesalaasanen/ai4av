---
spec_id: admin/bluesound-nad-roon-ready
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bluesound NAD Roon Ready Control Spec"
manufacturer: Bluesound
model_family: "Roon Ready"
aliases: []
compatible_with:
  manufacturers:
    - Bluesound
    - "Bluesound NAD"
  models:
    - "Roon Ready"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - content-bluesound-com.s3.amazonaws.com
  - bluos.io
source_urls:
  - https://content-bluesound-com.s3.amazonaws.com/uploads/BluOS-Custom-Integration-API_v1.7.pdf
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://bluos.io/wp-content/uploads/2024/04/BluOS_Integration_Utility_v1.8.1.zip
  - https://bluos.io/downloads/
retrieved_at: 2026-05-21T14:57:24.512Z
last_checked_at: 2026-09-13T22:18:48.214Z
generated_at: 2026-09-13T22:18:48.214Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - /RadioBrowse
  - /Settings
  - "firmware version compatibility ranges, LSDP binary packet details beyond header"
  - "no discrete feedback items are explicitly named as separate queries beyond /Status and /SyncStatus, which are documented as Actions of kind: query. Remove section or list response-derived states if needed."
  - "populate from source if any variable is settable without being a named action."
  - "source does not document unsolicited push notifications from the device. mDNS service discovery (musc.tcp, musp.tcp) and LSDP Announce broadcasts are mentioned but no event subscription mechanism is specified."
  - "no multi-step sequences explicitly described in source."
  - "source contains no safety warnings, interlocks, or power-on sequencing requirements."
  - "firmware version compatibility ranges not stated in source for LSDP protocol version details beyond header magic word \"LSDP\" and version 1."
verification:
  verdict: verified
  checked_at: 2026-09-13T22:18:48.214Z
  matched_actions: 45
  action_count: 45
  confidence: medium
  summary: "All 45 spec action literals match the source HTTP endpoint references verbatim; transport port 11000 and base_url match; coverage ratio well above 0.9. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# Bluesound NAD Roon Ready Control Spec

## Summary
Custom integration API for Bluesound/NAD BluOS players. HTTP GET requests to `http://<player_ip>:<port>/<request>` returning UTF-8 XML. Port 11000 default (CI580 uses 11000/11010/11020/11030; discover via mDNS services musc.tcp/musp.tcp). Source describes status queries, volume, playback control, queue management, presets, browse, search, grouping, reboot, doorbell, input select, Bluetooth mode.

<!-- UNRESOLVED: firmware version compatibility ranges, LSDP binary packet details beyond header -->

## Transport
```yaml
protocols:
  - http
addressing:
  port: 11000
  base_url: "http://{player_ip}:11000"  # player_ip from source example 192.168.1.100
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred: reboot endpoint present (no explicit power on/off documented)
- queryable       # inferred: /Status and /SyncStatus query endpoints present
- routable        # inferred: input/source selection via /Play?url= and /Play?inputTypeIndex=
- levelable       # inferred: /Volume level/mute/abs_db/db endpoints present
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
      description: Long-polling interval in seconds (recommended 100, min 60, never < 10)
    - name: etag
      type: string
      description: etag from previous /Status response

- id: sync_status_query
  label: Player and Group Sync Status
  kind: query
  command: "GET /SyncStatus"
  params:
    - name: timeout
      type: integer
      description: Long-polling interval in seconds (recommended 180)
    - name: etag
      type: string
      description: etag from previous /SyncStatus response

- id: volume_set
  label: Set Volume (absolute 0..100)
  kind: action
  command: "GET /Volume?level={level}&tell_slaves={tell_slaves}"
  params:
    - name: level
      type: integer
      description: Absolute volume 0-100
    - name: tell_slaves
      type: integer
      description: 0 = this player only, 1 = apply to all in group

- id: volume_set_db_absolute
  label: Set Volume (absolute dB)
  kind: action
  command: "GET /Volume?abs_db={abs_db}&tell_slaves={tell_slaves}"
  params:
    - name: abs_db
      type: number
      description: Volume in dB
    - name: tell_slaves
      type: integer
      description: 0 or 1

- id: volume_up
  label: Volume Up
  kind: action
  command: "GET /Volume?db={db_value}"
  params:
    - name: db_value
      type: number
      description: Increase step in dB (typical 2)

- id: volume_down
  label: Volume Down
  kind: action
  command: "GET /Volume?db=-{db_value}"
  params:
    - name: db_value
      type: number
      description: Decrease step in dB (typical 2)

- id: mute_on
  label: Mute On
  kind: action
  command: "GET /Volume?mute=1"

- id: mute_off
  label: Mute Off
  kind: action
  command: "GET /Volume?mute=0"

- id: volume_mute_relative
  label: Relative Volume Change (dB)
  kind: action
  command: "GET /Volume?db={delta_db}&tell_slaves={tell_slaves}"
  params:
    - name: delta_db
      type: number
      description: Positive or negative dB delta
    - name: tell_slaves
      type: integer
      description: 0 or 1

- id: play
  label: Play
  kind: action
  command: "GET /Play"
  params: []

- id: play_seek
  label: Play With Seek
  kind: action
  command: "GET /Play?seek={seek}"
  params:
    - name: seek
      type: integer
      description: Position in seconds within current track

- id: play_seek_track
  label: Play With Seek And Track Id
  kind: action
  command: "GET /Play?seek={seek}&id={id}"
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
    - name: encodedStreamURL
      type: string
      description: URL-encoded stream URL

- id: pause
  label: Pause
  kind: action
  command: "GET /Pause"

- id: pause_toggle
  label: Pause Toggle
  kind: action
  command: "GET /Pause?toggle=1"

- id: stop
  label: Stop
  kind: action
  command: "GET /Stop"

- id: skip
  label: Skip To Next Track
  kind: action
  command: "GET /Skip"

- id: back
  label: Back To Previous Track
  kind: action
  command: "GET /Back"

- id: shuffle
  label: Set Shuffle
  kind: action
  command: "GET /Shuffle?state={state}"
  params:
    - name: state
      type: integer
      description: 0 = off, 1 = on

- id: repeat
  label: Set Repeat Mode
  kind: action
  command: "GET /Repeat?state={state}"
  params:
    - name: state
      type: integer
      description: 0 = repeat queue, 1 = repeat track, 2 = repeat off

- id: radio_action
  label: Streaming Radio Station Action
  kind: action
  command: "GET /Action?service={service}&{action_url}"
  params:
    - name: service
      type: string
      description: Service name (e.g. Slacker, RadioParadise)
    - name: action_url
      type: string
      description: URL from <action url="..."> in /Status; supports skip/back/love/ban

- id: playlist_list
  label: List Play Queue
  kind: query
  command: "GET /Playlist"
  params: []

- id: playlist_status
  label: Play Queue Status
  kind: query
  command: "GET /Playlist?length=1"

- id: playlist_paginate
  label: Play Queue Page
  kind: query
  command: "GET /Playlist?start={start}&end={end}"
  params:
    - name: start
      type: integer
      description: First entry (0-based)
    - name: end
      type: integer
      description: Last entry

- id: playlist_delete
  label: Delete Track From Queue
  kind: action
  command: "GET /Delete?id={position}"
  params:
    - name: position
      type: integer
      description: Track id to delete

- id: playlist_move
  label: Move Track In Queue
  kind: action
  command: "GET /Move?new={new}&old={old}"
  params:
    - name: new
      type: integer
      description: Destination position
    - name: old
      type: integer
      description: Origin position

- id: playlist_clear
  label: Clear Play Queue
  kind: action
  command: "GET /Clear"

- id: playlist_save
  label: Save Play Queue As Playlist
  kind: action
  command: "GET /Save?name={playlist_name}"
  params:
    - name: playlist_name
      type: string
      description: Playlist name (URL-encode spaces)

- id: presets_list
  label: List Presets
  kind: query
  command: "GET /Presets"

- id: preset_load
  label: Load Preset By Id
  kind: action
  command: "GET /Preset?id={presetId}"
  params:
    - name: presetId
      type: integer
      description: Preset id

- id: preset_next
  label: Load Next Preset
  kind: action
  command: "GET /Preset?id=+1"

- id: preset_previous
  label: Load Previous Preset
  kind: action
  command: "GET /Preset?id=-1"

- id: browse
  label: Browse Music Content
  kind: query
  command: "GET /Browse?key={key}"
  params:
    - name: key
      type: string
      description: URL-encoded browseKey/nextKey/parentKey/contextMenuKey

- id: browse_with_context_menu
  label: Browse With Inline Context Menu
  kind: query
  command: "GET /Browse?key={key}&withContextMenuItems=1"
  params:
    - name: key
      type: string
      description: URL-encoded key
    - name: withContextMenuItems
      type: integer
      description: Always 1

- id: search
  label: Search Music Content
  kind: query
  command: "GET /Browse?key={key}&q={searchText}"
  params:
    - name: key
      type: string
      description: URL-encoded searchKey from prior response
    - name: searchText
      type: string
      description: Search term

- id: group_add_slave
  label: Group Single Secondary Player
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

- id: group_add_slaves
  label: Group Multiple Secondary Players
  kind: action
  command: "GET /AddSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated IPs
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated ports

- id: group_remove_slave
  label: Remove Single Player From Group
  kind: action
  command: "GET /RemoveSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: Secondary IP
    - name: secondaryPlayerPort
      type: integer
      description: Secondary port

- id: group_remove_slaves
  label: Remove Multiple Players From Group
  kind: action
  command: "GET /RemoveSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated IPs
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated ports

- id: player_reboot
  label: Soft Reboot Player
  kind: action
  command: "POST /reboot"
  params:
    - name: yes
      type: string
      description: Any value (e.g. 1); form-encoded

- id: doorbell_play
  label: Play Doorbell Chime
  kind: action
  command: "GET /Doorbell?play=1"

- id: input_select_capture_url
  label: Active Input Selection (Capture URL)
  kind: action
  command: "GET /Play?url={URL_value}"
  params:
    - name: URL_value
      type: string
      description: URL attribute from /RadioBrowse?service=Capture response

- id: input_select_legacy
  label: External Input Selection (firmware >3.8.0 and <4.2.0)
  kind: action
  command: "GET /Play?inputIndex={IndexId}"
  params:
    - name: IndexId
      type: integer
      description: 1-based index from /Settings?id=capture response, Bluetooth excluded

- id: input_select_typed
  label: External Input Selection (firmware >=4.2.0)
  kind: action
  command: "GET /Play?inputTypeIndex={type-index}"
  params:
    - name: type-index
      type: string
      description: "Format type-index, e.g. spdif-2; types: spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone"

- id: bluetooth_mode_set
  label: Set Bluetooth Mode
  kind: action
  command: "GET /audiomodes?bluetoothAutoplay={value}"
  params:
    - name: value
      type: integer
      description: "0=Manual, 1=Automatic, 2=Guest, 3=Disabled"
```

## Feedbacks
```yaml
# UNRESOLVED: no discrete feedback items are explicitly named as separate queries beyond /Status and /SyncStatus, which are documented as Actions of kind: query. Remove section or list response-derived states if needed.
```

## Variables
```yaml
# No discrete settable variables documented outside the parameterized Actions above.
# UNRESOLVED: populate from source if any variable is settable without being a named action.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited push notifications from the device. mDNS service discovery (musc.tcp, musp.tcp) and LSDP Announce broadcasts are mentioned but no event subscription mechanism is specified.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing requirements.
```

## Notes
- All endpoints are HTTP GET except `/reboot` which is HTTP POST with form body `yes=1`.
- Responses are UTF-8 encoded XML.
- Volume range typically -80..0 dB, configurable via BluOS Controller app (Settings -> Player -> Audio).
- When `streamUrl` is present in /Status response, play queue controls (skip/back/shuffle/repeat) are not applicable for that source.
- LSDP discovery protocol uses UDP broadcast on port 11430 (registered with IANA to Lenbrook). Documented separately in section 13.
- CI580 multi-streamer node port mapping: node 1 = 11000, node 2 = 11010, node 3 = 11020, node 4 = 11030.

<!-- UNRESOLVED: firmware version compatibility ranges not stated in source for LSDP protocol version details beyond header magic word "LSDP" and version 1. -->

## Provenance

```yaml
source_domains:
  - content-bluesound-com.s3.amazonaws.com
  - bluos.io
source_urls:
  - https://content-bluesound-com.s3.amazonaws.com/uploads/BluOS-Custom-Integration-API_v1.7.pdf
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://bluos.io/wp-content/uploads/2024/04/BluOS_Integration_Utility_v1.8.1.zip
  - https://bluos.io/downloads/
retrieved_at: 2026-05-21T14:57:24.512Z
last_checked_at: 2026-09-13T22:18:48.214Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-13T22:18:48.214Z
matched_actions: 45
action_count: 45
confidence: medium
summary: "All 45 spec action literals match the source HTTP endpoint references verbatim; transport port 11000 and base_url match; coverage ratio well above 0.9. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- /RadioBrowse
- /Settings
- "firmware version compatibility ranges, LSDP binary packet details beyond header"
- "no discrete feedback items are explicitly named as separate queries beyond /Status and /SyncStatus, which are documented as Actions of kind: query. Remove section or list response-derived states if needed."
- "populate from source if any variable is settable without being a named action."
- "source does not document unsolicited push notifications from the device. mDNS service discovery (musc.tcp, musp.tcp) and LSDP Announce broadcasts are mentioned but no event subscription mechanism is specified."
- "no multi-step sequences explicitly described in source."
- "source contains no safety warnings, interlocks, or power-on sequencing requirements."
- "firmware version compatibility ranges not stated in source for LSDP protocol version details beyond header magic word \"LSDP\" and version 1."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
