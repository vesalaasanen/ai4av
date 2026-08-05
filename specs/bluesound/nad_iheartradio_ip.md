---
spec_id: admin/bluesound-nad-iheartradio
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bluesound NAD iHeartRadio (BluOS CI API) Control Spec"
manufacturer: Bluesound
model_family: "iHeartRadio (BluOS streaming service)"
aliases: []
compatible_with:
  manufacturers:
    - Bluesound
    - "Bluesound NAD"
  models:
    - "iHeartRadio (BluOS streaming service)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluesoundprofessional.com
  - bluos.io
  - content-bluesound-com.s3.amazonaws.com
  - bluesound.com
source_urls:
  - https://bluesoundprofessional.com/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://bluos.io/downloads/
  - https://content-bluesound-com.s3.amazonaws.com/uploads/2022/04/Custom-Integration-API-v1.4.pdf
  - https://www.bluesound.com/pages/downloads
retrieved_at: 2026-07-22T00:45:57.300Z
last_checked_at: 2026-07-22T01:06:18.603Z
generated_at: 2026-07-22T01:06:18.603Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "/RadioBrowse?service=Capture"
  - "/Settings?id=capture&schemaVersion=32"
  - "source describes the BluOS CI API in general, not iHeartRadio-specific extensions; iHeartRadio behaves as a streaming source within the API and uses standard endpoints."
  - "no separately settable continuous variables beyond those exposed via Actions (volume level, mute, repeat, shuffle, bluetoothAutoplay). All settable parameters are covered as Actions."
  - "source does not describe unsolicited notification endpoints; long-polling on /Status and /SyncStatus is documented but it returns the same XML response shapes, not separate event types."
  - "no multi-step sequences are documented in the source."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "iHeartRadio-specific control extensions are not documented in this generic BluOS CI API document; iHeartRadio is treated as a streaming service selectable via /Presets, /Browse, or /Play?url=. No iHeartRadio-only endpoints were enumerated in the source."
verification:
  verdict: verified
  checked_at: 2026-07-22T01:06:18.603Z
  matched_actions: 48
  action_count: 48
  confidence: medium
  summary: "All 48 spec actions map to literal source endpoints with matching shapes; transport and LSDP port confirmed; only two helper query endpoints are unrepresented. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Bluesound NAD iHeartRadio (BluOS CI API) Control Spec

## Summary
Spec covers the BluOS Custom Integration HTTP API used to control iHeartRadio streaming (and other BluOS services) on Bluesound/NAD BluOS-enabled players. All commands are HTTP GET requests issued to `http://<player_ip>:11000/<request>`, with responses as UTF-8 encoded XML. Companion Lenbrook Service Discovery Protocol (LSDP) runs on UDP broadcast port 11430.

<!-- UNRESOLVED: source describes the BluOS CI API in general, not iHeartRadio-specific extensions; iHeartRadio behaves as a streaming source within the API and uses standard endpoints. -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  port: 11000
  base_url: "http://{player_ip}:11000"
auth:
  type: none  # inferred: no auth procedure in source
```

LSDP discovery uses UDP broadcast on port 11430 (IANA-registered to Lenbrook).

## Traits
```yaml
- powerable       # inferred from /reboot endpoint (soft reboot documented)
- queryable       # inferred from /Status and /SyncStatus query endpoints
- routable        # inferred from input selection endpoints (/Play?url=, /Play?inputTypeIndex=)
- levelable       # inferred from /Volume endpoint (volume up/down/set/mute)
```

## Actions
```yaml
# Section 2 - Status queries
- id: status_query
  label: Playback Status
  kind: query
  command: "GET /Status"
  params: []
  notes: Supports long-polling via timeout and etag query params.

- id: sync_status_query
  label: Player and Group Sync Status
  kind: query
  command: "GET /SyncStatus"
  params: []
  notes: Supports long-polling via timeout and etag query params.

# Section 3 - Volume control
- id: volume_set
  label: Set Volume (level 0-100)
  kind: action
  command: "GET /Volume?level={level}&tell_slaves={tell_slaves}"
  params:
    - name: level
      type: integer
      description: Absolute volume level, integer 0-100
    - name: tell_slaves
      type: enum
      values: [0, 1]
      description: "0 = only selected player changes; 1 = all players in group change"

- id: volume_set_db_absolute
  label: Set Volume (absolute dB)
  kind: action
  command: "GET /Volume?abs_db={db}&tell_slaves={tell_slaves}"
  params:
    - name: db
      type: number
      description: Absolute volume level in dB

- id: volume_set_db_relative
  label: Adjust Volume (relative dB)
  kind: action
  command: "GET /Volume?db={delta_db}&tell_slaves={tell_slaves}"
  params:
    - name: delta_db
      type: number
      description: Relative volume change in dB (positive or negative)

- id: volume_mute
  label: Mute Player
  kind: action
  command: "GET /Volume?mute=1"
  params: []

- id: volume_unmute
  label: Unmute Player
  kind: action
  command: "GET /Volume?mute=0"
  params: []

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

# Section 4 - Playback control
- id: play
  label: Play
  kind: action
  command: "GET /Play"
  params: []

- id: play_seek
  label: Play with seek
  kind: action
  command: "GET /Play?seek={seconds}"
  params:
    - name: seconds
      type: integer
      description: Position in seconds to jump to in current track

- id: play_seek_trackid
  label: Play with seek and track id
  kind: action
  command: "GET /Play?seek={seconds}&id={trackid}"
  params:
    - name: seconds
      type: integer
    - name: trackid
      type: integer
      description: Track number in queue (0-based or as exposed by /Playlist)

- id: play_url
  label: Play streamed URL
  kind: action
  command: "GET /Play?url={encodedStreamURL}"
  params:
    - name: encodedStreamURL
      type: string
      description: URL of streamed custom audio, URL-encoded

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
  label: Skip (next track)
  kind: action
  command: "GET /Skip"
  params: []

- id: back
  label: Back (previous track)
  kind: action
  command: "GET /Back"
  params: []

- id: shuffle
  label: Set Shuffle State
  kind: action
  command: "GET /Shuffle?state={state}"
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0 = disable shuffle; 1 = enable shuffle"

- id: repeat
  label: Set Repeat State
  kind: action
  command: "GET /Repeat?state={state}"
  params:
    - name: state
      type: enum
      values: [0, 1, 2]
      description: "0 = repeat entire play queue; 1 = repeat current track; 2 = repeat off"

- id: action_radio_skip
  label: Radio Station Action - Skip
  kind: action
  command: "GET /Action?service={service}&skip={trackid}"
  params:
    - name: service
      type: string
      description: Streaming service name (e.g. Slacker)
    - name: trackid
      type: string
      description: Track id from action URL in /Status

- id: action_radio_love
  label: Radio Station Action - Love
  kind: action
  command: "GET /Action?service={service}&love={trackid}"
  params:
    - name: service
      type: string
    - name: trackid
      type: string

- id: action_radio_ban
  label: Radio Station Action - Ban
  kind: action
  command: "GET /Action?service={service}&ban={trackid}"
  params:
    - name: service
      type: string
    - name: trackid
      type: string

# Section 5 - Play queue management
- id: playlist_list
  label: List Play Queue
  kind: query
  command: "GET /Playlist"
  params: []

- id: playlist_status
  label: Play Queue Status Only
  kind: query
  command: "GET /Playlist?length=1"
  params: []

- id: playlist_page
  label: List Play Queue Page
  kind: query
  command: "GET /Playlist?start={first}&end={last}"
  params:
    - name: first
      type: integer
      description: First entry index (starting from 0)
    - name: last
      type: integer
      description: Last entry index

- id: queue_delete
  label: Delete Track from Queue
  kind: action
  command: "GET /Delete?id={position}"
  params:
    - name: position
      type: integer
      description: Track position in queue

- id: queue_move
  label: Move Track in Queue
  kind: action
  command: "GET /Move?new={destination}&old={origin}"
  params:
    - name: destination
      type: integer
    - name: origin
      type: integer

- id: queue_clear
  label: Clear Play Queue
  kind: action
  command: "GET /Clear"
  params: []

- id: queue_save
  label: Save Play Queue as Playlist
  kind: action
  command: "GET /Save?name={playlist_name}"
  params:
    - name: playlist_name
      type: string

# Section 6 - Presets
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
      description: Preset id number, or +1 (next) or -1 (previous)

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

# Section 7 - Browsing and searching
- id: browse_top
  label: Top-Level Browse
  kind: query
  command: "GET /Browse"
  params: []

- id: browse_key
  label: Browse by Key
  kind: query
  command: "GET /Browse?key={key_value}"
  params:
    - name: key_value
      type: string
      description: URL-encoded key from prior browseKey / nextKey / parentKey

- id: browse_with_context
  label: Browse with Inline Context Menu
  kind: query
  command: "GET /Browse?key={key_value}&withContextMenuItems=1"
  params:
    - name: key_value
      type: string

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

# Section 8 - Player grouping
- id: group_add_slave
  label: Group One Secondary Player
  kind: action
  command: "GET /AddSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}&group={groupName}"
  params:
    - name: secondaryPlayerIP
      type: string
    - name: secondaryPlayerPort
      type: integer
      description: Default 11000
    - name: groupName
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
  label: Remove One Secondary Player from Group
  kind: action
  command: "GET /RemoveSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: secondaryPlayerIP
      type: string
    - name: secondaryPlayerPort
      type: integer

- id: group_remove_slaves
  label: Remove Multiple Secondary Players from Group
  kind: action
  command: "GET /RemoveSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
    - name: secondaryPlayerPorts
      type: string

# Section 9 - Player reboot
- id: reboot
  label: Reboot Player
  kind: action
  command: "POST /reboot"
  params:
    - name: yes
      type: string
      description: Any value (e.g. 1) submitted as form field

# Section 10 - Doorbell
- id: doorbell_play
  label: Play Doorbell Chime
  kind: action
  command: "GET /Doorbell?play=1"
  params: []

# Section 11 - Direct input
- id: input_select_url
  label: Select Active Input via URL
  kind: action
  command: "GET /Play?url={URL_value}"
  params:
    - name: URL_value
      type: string
      description: URL attribute from /RadioBrowse?service=Capture

- id: input_select_index
  label: Select External Input by Index (firmware > v3.8.0 and < v4.2.0)
  kind: action
  command: "GET /Play?inputIndex={IndexId}"
  params:
    - name: IndexId
      type: integer
      description: "1-based index of inputs from /Settings?id=capture (Bluetooth excluded)"

- id: input_select_type_index
  label: Select External Input by Type-Index (firmware >= v4.2.0)
  kind: action
  command: "GET /Play?inputTypeIndex={typeIndex}"
  params:
    - name: typeIndex
      type: string
      description: "Format {type}-{index}. Types: spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone. Index starts from 1."

# Section 12 - Bluetooth
- id: bluetooth_set_mode
  label: Set Bluetooth Mode
  kind: action
  command: "GET /audiomodes?bluetoothAutoplay={value}"
  params:
    - name: value
      type: enum
      values: [0, 1, 2, 3]
      description: "0 = Manual, 1 = Automatic, 2 = Guest, 3 = Disabled"
```

## Feedbacks
```yaml
- id: playback_state
  type: enum
  values: [play, pause, stop, stream, connecting]
  description: Current player state, returned by /Status as <state>

- id: volume_level
  type: integer
  description: Volume level 0-100 (or -1 for fixed), returned in /Status and /Volume responses

- id: mute_state
  type: enum
  values: [0, 1]
  description: 1 if muted, 0 if unmuted (also exposed as <mute>)

- id: db_level
  type: number
  description: Volume level in dB

- id: shuffle_state
  type: enum
  values: [0, 1]
  description: 1 = shuffled, 0 = not shuffled

- id: repeat_state
  type: enum
  values: [0, 1, 2]
  description: "0 = repeat queue, 1 = repeat track, 2 = repeat off"

- id: song_id
  type: integer
  description: Current track position in play queue (from <song> in /Status)

- id: etag
  type: string
  description: Opaque etag attribute on /Status and /SyncStatus roots, used for long-polling

- id: group_name
  type: string
  description: Group name when player is primary in group (from /Status <groupName>)

- id: group_volume
  type: integer
  description: Group volume when primary player (from /Status <groupVolume>)
```

## Variables
```yaml
# UNRESOLVED: no separately settable continuous variables beyond those exposed via Actions (volume level, mute, repeat, shuffle, bluetoothAutoplay). All settable parameters are covered as Actions.
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited notification endpoints; long-polling on /Status and /SyncStatus is documented but it returns the same XML response shapes, not separate event types.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences are documented in the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- All commands are HTTP GET requests against `http://<player_ip>:11000/<endpoint>`, except `/reboot` which is POST.
- Responses are UTF-8 encoded XML.
- LSDP (Lenbrook Service Discovery Protocol) is documented separately in §13. It uses UDP broadcast on port 11430 with magic word "LSDP", and serves as the recommended discovery mechanism because the document notes multicast-based mDNS is unreliable on some customer networks.
- Polling guidance: regular polling limited to at most one request every 30 seconds; long-poll not used to make two consecutive requests for the same resource less than 1 second apart.
- Volume range is typically -80..0 dB and is configurable via BluOS Controller app (Settings → Player → Audio).
- CI580 has four streamer nodes using ports 11000, 11010, 11020, 11030 (one port per node); default is 11000.
- For radio stations without a play queue, use /Action endpoint with action URLs returned in /Status <actions> elements.
- BluOS HUB input selection is supported only via the `/Play?url=` direct input endpoint (§11.1).
- External input selection has two forms depending on firmware: `inputIndex` for firmware newer than v3.8.0 and older than v4.2.0; `inputTypeIndex` for firmware v4.2.0 or newer.

<!-- UNRESOLVED: iHeartRadio-specific control extensions are not documented in this generic BluOS CI API document; iHeartRadio is treated as a streaming service selectable via /Presets, /Browse, or /Play?url=. No iHeartRadio-only endpoints were enumerated in the source. -->

## Provenance

```yaml
source_domains:
  - bluesoundprofessional.com
  - bluos.io
  - content-bluesound-com.s3.amazonaws.com
  - bluesound.com
source_urls:
  - https://bluesoundprofessional.com/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
  - https://bluos.io/downloads/
  - https://content-bluesound-com.s3.amazonaws.com/uploads/2022/04/Custom-Integration-API-v1.4.pdf
  - https://www.bluesound.com/pages/downloads
retrieved_at: 2026-07-22T00:45:57.300Z
last_checked_at: 2026-07-22T01:06:18.603Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T01:06:18.603Z
matched_actions: 48
action_count: 48
confidence: medium
summary: "All 48 spec actions map to literal source endpoints with matching shapes; transport and LSDP port confirmed; only two helper query endpoints are unrepresented. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "/RadioBrowse?service=Capture"
- "/Settings?id=capture&schemaVersion=32"
- "source describes the BluOS CI API in general, not iHeartRadio-specific extensions; iHeartRadio behaves as a streaming source within the API and uses standard endpoints."
- "no separately settable continuous variables beyond those exposed via Actions (volume level, mute, repeat, shuffle, bluetoothAutoplay). All settable parameters are covered as Actions."
- "source does not describe unsolicited notification endpoints; long-polling on /Status and /SyncStatus is documented but it returns the same XML response shapes, not separate event types."
- "no multi-step sequences are documented in the source."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "iHeartRadio-specific control extensions are not documented in this generic BluOS CI API document; iHeartRadio is treated as a streaming service selectable via /Presets, /Browse, or /Play?url=. No iHeartRadio-only endpoints were enumerated in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
