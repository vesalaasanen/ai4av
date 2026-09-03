---
spec_id: admin/bluos-b400s-volume-control
schema_version: ai4av-public-spec-v1
revision: 1
title: "BluOS B400S Volume Control"
manufacturer: BluOS
model_family: B400S
aliases: []
compatible_with:
  manufacturers:
    - BluOS
  models:
    - B400S
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-07-12T08:05:42.496Z
last_checked_at: 2026-09-02T22:17:38.819Z
generated_at: 2026-09-02T22:17:38.819Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document covers the whole BluOS player API family; device-specific hardware capabilities of the B400S (number of zones, input count, fixed-vs-variable volume range, HUB connections) are not separately stated."
  - "no continuous/variable parameters beyond the discrete command arguments are documented in source."
  - "source describes long-polling via /Status and /SyncStatus but does not document unsolicited push events."
  - "source does not document named device-side macro sequences."
  - "no safety warnings or interlock procedures found in source."
  - "device-specific hardware limits (number of inputs, fixed-vs-variable volume capability, B400S-specific behaviors) are not stated in this generic BluOS CI document. The Lenbrook reference applies the same API surface to all BluOS players listed (Bluesound, NAD, DALI); confirm B400S supports each command against the specific firmware revision shipped on the unit."
verification:
  verdict: verified
  checked_at: 2026-09-02T22:17:38.819Z
  matched_actions: 47
  action_count: 47
  confidence: medium
  summary: "All 47 spec actions map to documented BluOS CI HTTP endpoints (port 11000) with correct parameter shapes; transport values verified. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# BluOS B400S Volume Control

## Summary
BluOS B400S Volume Control exposes a subset of the BluOS Custom Integration HTTP API focused on volume and mute control. All commands are HTTP GET requests to the player on TCP port 11000 returning UTF-8 XML responses. This spec captures the volume, mute, playback, queue, grouping, preset, browse, doorbell, input and reboot endpoints documented in the source.

<!-- UNRESOLVED: source document covers the whole BluOS player API family; device-specific hardware capabilities of the B400S (number of zones, input count, fixed-vs-variable volume range, HUB connections) are not separately stated. -->

## Transport
```yaml
protocols:
  - http
addressing:
  port: 11000
  base_url: http://<player_ip>:11000
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred: /reboot and doorbell/standby controls present
- routable        # inferred: input selection commands (Play?url=, /Play?inputIndex=, /Play?inputTypeIndex=) present
- queryable       # inferred: /Status, /SyncStatus, /Playlist, /Presets query endpoints present
- levelable       # inferred: /Volume level/db/abs_db/mute controls present
```

## Actions
```yaml
- id: set_volume_level
  label: Set Volume Level (0-100)
  kind: action
  command: "GET /Volume?level={level}&tell_slaves={tell_slaves}"
  params:
    - name: level
      type: integer
      description: Absolute volume level 0..100
    - name: tell_slaves
      type: integer
      description: 0 = only this player, 1 = apply to all grouped players
- id: set_volume_abs_db
  label: Set Volume (absolute dB)
  kind: action
  command: "GET /Volume?abs_db={db}&tell_slaves={tell_slaves}"
  params:
    - name: db
      type: number
      description: Absolute dB volume within configured range (typically -80..0)
    - name: tell_slaves
      type: integer
      description: 0 = only this player, 1 = apply to all grouped players
- id: set_volume_relative_db
  label: Adjust Volume (relative dB)
  kind: action
  command: "GET /Volume?db={delta_db}&tell_slaves={tell_slaves}"
  params:
    - name: delta_db
      type: number
      description: Positive or negative dB delta
    - name: tell_slaves
      type: integer
      description: 0 = only this player, 1 = apply to all grouped players
- id: volume_up
  label: Volume Up
  kind: action
  command: "GET /Volume?db={db_value}"
  params:
    - name: db_value
      type: number
      description: dB increase (typical 2)
- id: volume_down
  label: Volume Down
  kind: action
  command: "GET /Volume?db=-{db_value}"
  params:
    - name: db_value
      type: number
      description: dB decrease (typical 2)
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
- id: play_with_seek
  label: Play with Seek
  kind: action
  command: "GET /Play?seek={seconds}"
  params:
    - name: seconds
      type: integer
      description: Position in seconds within current track
- id: play_with_seek_and_id
  label: Play Track at Seek
  kind: action
  command: "GET /Play?seek={seconds}&id={trackid}"
  params:
    - name: seconds
      type: integer
      description: Position in seconds
    - name: trackid
      type: integer
      description: Track id within the queue (1-based)
- id: play_url
  label: Play Stream URL
  kind: action
  command: "GET /Play?url={encodedStreamURL}"
  params:
    - name: encodedStreamURL
      type: string
      description: URL-encoded audio stream URL
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
  label: Skip (Next Track)
  kind: action
  command: "GET /Skip"
  params: []
- id: back
  label: Back (Previous Track)
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
      description: 0 = disable shuffle, 1 = enable shuffle
- id: repeat
  label: Set Repeat
  kind: action
  command: "GET /Repeat?state={state}"
  params:
    - name: state
      type: integer
      description: 0 = repeat queue, 1 = repeat track, 2 = repeat off
- id: streaming_action
  label: Streaming Radio Action
  kind: action
  command: "GET /Action?service={service-name}&action={action-URL}"
  params:
    - name: service-name
      type: string
      description: Streaming service name (e.g. Slacker)
    - name: action-URL
      type: string
      description: URL from the <action> element in /Status response (skip/back/love/ban)
- id: playlist_list
  label: List Play Queue
  kind: action
  command: "GET /Playlist"
  params: []
- id: playlist_status
  label: Play Queue Status
  kind: action
  command: "GET /Playlist?length=1"
  params: []
- id: playlist_paginate
  label: Play Queue Page
  kind: action
  command: "GET /Playlist?start={first}&end={last}"
  params:
    - name: first
      type: integer
      description: First entry index (0-based)
    - name: last
      type: integer
      description: Last entry index
- id: playlist_delete
  label: Delete Track
  kind: action
  command: "GET /Delete?id={position}"
  params:
    - name: position
      type: integer
      description: Track position in queue to remove
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
      description: Saved playlist name
- id: presets_list
  label: List Presets
  kind: action
  command: "GET /Presets"
  params: []
- id: preset_load
  label: Load Preset
  kind: action
  command: "GET /Preset?id={presetId}"
  params:
    - name: presetId
      type: string
      description: Preset id, or +1 (next), or -1 (previous)
- id: browse
  label: Browse
  kind: action
  command: "GET /Browse?key={key-value}"
  params:
    - name: key-value
      type: string
      description: URL-encoded browseKey from earlier response; omit for top-level
- id: browse_with_context
  label: Browse with Context Menu
  kind: action
  command: "GET /Browse?key={key-value}&withContextMenuItems=1"
  params:
    - name: key-value
      type: string
      description: URL-encoded browseKey
- id: search
  label: Search Music
  kind: action
  command: "GET /Browse?key={key-value}&q={searchText}"
  params:
    - name: key-value
      type: string
      description: URL-encoded searchKey from earlier response
    - name: searchText
      type: string
      description: Search query string
- id: radio_browse_capture
  label: List Capture Inputs
  kind: action
  command: "GET /RadioBrowse?service=Capture"
  params: []
- id: play_active_input
  label: Play Active Input (URL)
  kind: action
  command: "GET /Play?url={URL_value}"
  params:
    - name: URL_value
      type: string
      description: URL attribute from /RadioBrowse?service=Capture response
- id: play_external_input_legacy
  label: Play External Input (pre-v4.2.0)
  kind: action
  command: "GET /Play?inputIndex={IndexId}"
  params:
    - name: IndexId
      type: integer
      description: 1-based input index (excludes Bluetooth); firmware between v3.8.0 and v4.2.0
- id: play_external_input
  label: Play External Input (v4.2.0+)
  kind: action
  command: "GET /Play?inputTypeIndex={type-index}"
  params:
    - name: type-index
      type: string
      description: "{type}-{index}" e.g. spdif-2; type ∈ spdif/analog/coax/bluetooth/arc/earc/phono/computer/aesebu/balanced/microphone
- id: group_add_slave
  label: Group One Player
  kind: action
  command: "GET /AddSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}&group={GroupName}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: IP of secondary player
    - name: secondaryPlayerPort
      type: integer
      description: Port of secondary player (default 11000)
    - name: GroupName
      type: string
      description: Optional group name
- id: group_add_slaves
  label: Group Multiple Players
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
  label: Remove One Player From Group
  kind: action
  command: "GET /RemoveSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: IP of secondary player to ungroup
    - name: secondaryPlayerPort
      type: integer
      description: Port of secondary player
- id: group_remove_slaves
  label: Remove Multiple Players From Group
  kind: action
  command: "GET /RemoveSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated IPs to remove
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated ports
- id: reboot
  label: Reboot Player
  kind: action
  command: "POST /reboot  body: yes={any}"
  params:
    - name: any
      type: string
      description: Any value (e.g. 1)
- id: doorbell_play
  label: Play Doorbell Chime
  kind: action
  command: "GET /Doorbell?play=1"
  params: []
- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  command: "GET /audiomodes?bluetoothAutoplay={value}"
  params:
    - name: value
      type: integer
      description: 0=Manual, 1=Automatic, 2=Guest, 3=Disabled
- id: status
  label: Playback Status
  kind: query
  command: "GET /Status"
  params: []
- id: status_long_poll
  label: Playback Status (Long Poll)
  kind: query
  command: "GET /Status?timeout={seconds}&etag={etag-value}"
  params:
    - name: seconds
      type: integer
      description: Long-poll interval (recommended 100)
    - name: etag-value
      type: string
      description: etag attribute from previous /Status response
- id: sync_status
  label: Player and Group Sync Status
  kind: query
  command: "GET /SyncStatus"
  params: []
- id: sync_status_long_poll
  label: Sync Status (Long Poll)
  kind: query
  command: "GET /SyncStatus?timeout={seconds}&etag={etag-value}"
  params:
    - name: seconds
      type: integer
      description: Long-poll interval (recommended 180)
    - name: etag-value
      type: string
      description: etag attribute from previous /SyncStatus response
- id: capture_settings
  label: Capture Input Settings
  kind: query
  command: "GET /Settings?id=capture&schemaVersion={n}"
  params:
    - name: n
      type: integer
      description: Schema version (latest is 32 per source)
```

## Feedbacks
```yaml
- id: status_root
  type: object
  description: Root <status> element returned by /Status. Attributes include etag, volume (0..100 or -1 for fixed), db, mute (0/1), muteDb, muteVolume, state (play/pause/stop/stream/connecting), song, totlen, secs, shuffle (0/1), repeat (0/1/2), service, quality, pid, prid, syncStat, groupName, groupVolume, battery{level,charging,icon}, and now-playing title1/title2/title3 elements.
- id: sync_status_root
  type: object
  description: Root <SyncStatus> element. Attributes: etag, volume, modelName, name, model, brand, group, syncStat, id (ip:port), mac, schemaVersion, initialized (true/false), outlevel. Children: <master port=…>ip</master>, <slave port=… id=ip/> for grouped players.
- id: volume_response
  type: object
  description: <volume db="" mute="" muteDb="" muteVolume="" offsetDb="" etag="">level</volume> returned by /Volume and /Volume?mute. Text content is 0..100 (or -1 for fixed volume).
- id: playback_state
  type: enum
  values: [play, pause, stop, stream, connecting]
- id: mute_state
  type: enum
  values: [muted, unmuted]
- id: playlist_response
  type: object
  description: <playlist name="" modified="" length="" shuffle="" repeat="" id=""> with <song> children containing albumid/service/artistid/songid/id/title/art/alb/fn attributes.
- id: presets_response
  type: object
  description: <presets prid=""><preset id="" name="" url="" image=""/></presets>
- id: browse_response
  type: object
  description: <browse sid="" service="" serviceName="" serviceIcon="" searchKey="" type=""> with <item> and <category> children. type ∈ menu, contextMenu. Error variant is <error> with <message> + <detail>.
- id: skip_response
  type: object
  description: <id>{track-id}</id> after /Skip
- id: back_response
  type: object
  description: <id>{track-id}</id> after /Back
- id: shuffle_response
  type: object
  description: <playlist name="" modified="" length="" shuffle="" id=""/> after /Shuffle
- id: repeat_response
  type: object
  description: <playlist length="" id="" repeat=""/> after /Repeat
- id: delete_response
  type: object
  description: <deleted>{position}</deleted> after /Delete
- id: move_response
  type: object
  description: <moved>moved</moved> after /Move
- id: clear_response
  type: object
  description: <playlist modified="" length="" id=""/> after /Clear
- id: save_response
  type: object
  description: <saved><entries>N</entries></saved> after /Save
- id: preset_load_response_playlist
  type: object
  description: <loaded service=""><entries>N</entries></loaded> when preset is a track list
- id: preset_load_response_stream
  type: enum
  values: [stream]
  description: Returned as <state>stream</state> when preset is a radio
- id: add_slave_response
  type: object
  description: <addSlave><slave port="" id=""/></addSlave> after /AddSlave
- id: action_ack_skip_back
  type: enum
  values: [skip, back]
  description: Acknowledgement root elements <skip/> and <back/> for streaming radio skip/back actions
- id: action_ack_love
  type: integer
  description: <love>1</love> acknowledgement
- id: action_ack_ban
  type: object
  description: <love skip="1">0</love> acknowledgement for ban
- id: doorbell_response
  type: object
  description: <status enable="" volume="" chime=""/> after /Doorbell
- id: capture_browse_response
  type: object
  description: <radiotime service="Capture"><item/><category/></radiotime> after /RadioBrowse?service=Capture
- id: reboot_response
  type: string
  description: Plain HTML/text page containing "Settings Updated" and "Rebooting. Please close this window."
```

## Variables
```yaml
# UNRESOLVED: no continuous/variable parameters beyond the discrete command arguments are documented in source.
```

## Events
```yaml
# UNRESOLVED: source describes long-polling via /Status and /SyncStatus but does not document unsolicited push events.
```

## Macros
```yaml
# UNRESOLVED: source does not document named device-side macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source.
```

## Notes
- Default TCP port 11000. CI580 uses 11000/11010/11020/11030 per node; CI580 is out-of-scope for B400S but port discovery via mDNS services `musc.tcp` / `musp.tcp` is the recommended discovery method.
- All volume commands are constrained to the player's configured volume range (typically -80..0 dB); the range is adjustable only via the BluOS Controller app.
- Polling guidance: ≤1 request / 30s when not using long polling; long-poll /Status recommended 100s interval (never faster than 10s); long-poll /SyncStatus recommended 180s. Long-poll requests for the same resource must be ≥1s apart.
- /Play?inputIndex requires firmware between v3.8.0 and v4.2.0; /Play?inputTypeIndex requires firmware v4.2.0 or newer. Both exclude Bluetooth; Bluetooth input selection requires /audiomodes + source connect flow.
- /Skip and /Back are valid only when /Status has no <streamUrl> element; streaming radio skip/back go through /Action.
- HUB inputs are reached via /RadioBrowse?service=Capture then /Play?url=Hub://ip:port/inputN.
- LSDP discovery (UDP port 11430) is documented in section 13 but is a discovery protocol, not a control protocol — outside scope of this control spec.

<!-- UNRESOLVED: device-specific hardware limits (number of inputs, fixed-vs-variable volume capability, B400S-specific behaviors) are not stated in this generic BluOS CI document. The Lenbrook reference applies the same API surface to all BluOS players listed (Bluesound, NAD, DALI); confirm B400S supports each command against the specific firmware revision shipped on the unit. -->

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-07-12T08:05:42.496Z
last_checked_at: 2026-09-02T22:17:38.819Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-02T22:17:38.819Z
matched_actions: 47
action_count: 47
confidence: medium
summary: "All 47 spec actions map to documented BluOS CI HTTP endpoints (port 11000) with correct parameter shapes; transport values verified. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document covers the whole BluOS player API family; device-specific hardware capabilities of the B400S (number of zones, input count, fixed-vs-variable volume range, HUB connections) are not separately stated."
- "no continuous/variable parameters beyond the discrete command arguments are documented in source."
- "source describes long-polling via /Status and /SyncStatus but does not document unsolicited push events."
- "source does not document named device-side macro sequences."
- "no safety warnings or interlock procedures found in source."
- "device-specific hardware limits (number of inputs, fixed-vs-variable volume capability, B400S-specific behaviors) are not stated in this generic BluOS CI document. The Lenbrook reference applies the same API surface to all BluOS players listed (Bluesound, NAD, DALI); confirm B400S supports each command against the specific firmware revision shipped on the unit."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
