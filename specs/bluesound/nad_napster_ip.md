---
spec_id: admin/bluesound-nad-napster
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bluesound NAD BluOS Custom Integration API Control Spec"
manufacturer: Bluesound
model_family: "BluOS Player"
aliases: []
compatible_with:
  manufacturers:
    - Bluesound
    - "Bluesound NAD"
  models:
    - "BluOS Player"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - content-bluesound-com.s3.amazonaws.com
  - bluesound.com
source_urls:
  - https://content-bluesound-com.s3.amazonaws.com/uploads/BluOS-Custom-Integration-API_v1.7.pdf
  - https://www.bluesound.com/pages/downloads
  - https://content-bluesound-com.s3.amazonaws.com/uploads/2024/04/BluOS_Integration_Utility_v1.8.1.zip
retrieved_at: 2026-05-21T14:04:05.164Z
last_checked_at: 2026-09-13T22:17:44.396Z
generated_at: 2026-09-13T22:17:44.396Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device-name \"Bluesound NAD Napster\" supplied by operator does not appear in source; source covers the generic BluOS Custom Integration API applicable across Bluesound/NAD/DALI BluOS players."
  - "CI580 node-specific ports (11010, 11020, 11030) per source are not represented above."
  - "source describes state attributes and response elements but no separate settable variables outside of command parameters"
  - "source does not document unsolicited notifications separate from polling responses"
  - "source does not document multi-step macro sequences"
  - "source mentions \"user confirmation should be requested\" for delete context-menu actions on playlists (section 7.1); no explicit safety warnings, interlock procedures, or power-on sequencing requirements are documented."
  - "many fields documented in source response attributes (etag, syncStat, title1/title2/title3, image, service, sid, pid, prid, totlen, secs, db, muteDb, muteVolume, offsetDb, alarmsecondsremaining, etc.) are observable but not enumerated above; expand Feedbacks if full fidelity required."
  - "LSDP (Lenbrook Service Discovery Protocol, UDP broadcast port 11430) is documented in source section 13 but not exposed above; no transport entry for udp included."
verification:
  verdict: verified
  checked_at: 2026-09-13T22:17:44.396Z
  matched_actions: 48
  action_count: 48
  confidence: medium
  summary: "All 48 spec actions match source endpoints literally with correct parameter shapes; every BluOS CI command endpoint is represented. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# Bluesound NAD BluOS Custom Integration API Control Spec

## Summary
This spec covers the BluOS Custom Integration HTTP API published by Lenbrook Industries for Bluesound and NAD BluOS-enabled streaming players. All commands are HTTP GET requests sent to `http://<player_ip>:11000/<request>` (port 11010/11020/11030 for CI580 nodes 2/3/4). Responses are UTF-8 encoded XML.

<!-- UNRESOLVED: device-name "Bluesound NAD Napster" supplied by operator does not appear in source; source covers the generic BluOS Custom Integration API applicable across Bluesound/NAD/DALI BluOS players. -->

## Transport
```yaml
protocols:
  - http
addressing:
  port: 11000
  base_url: "/"
auth:
  type: none  # inferred: no auth procedure in source
```

<!-- UNRESOLVED: CI580 node-specific ports (11010, 11020, 11030) per source are not represented above. -->

## Traits
```yaml
- powerable       # inferred from power on/off commands present
- routable        # inferred from input routing commands present
- queryable       # inferred from query command examples
- levelable       # inferred from volume control commands present
```

## Actions
```yaml
- id: get_status
  label: Get Playback Status
  kind: query
  command: "/Status"
  params: []
- id: get_status_long_poll
  label: Get Playback Status (Long Poll)
  kind: query
  command: "/Status?timeout={seconds}&etag={etag-value}"
  params:
    - name: seconds
      type: integer
      description: Long-poll interval; recommended 100s, never faster than 10s.
    - name: etag-value
      type: string
      description: etag attribute from previous /Status response.

- id: get_sync_status
  label: Get Player and Group Sync Status
  kind: query
  command: "/SyncStatus"
  params: []
- id: get_sync_status_long_poll
  label: Get Sync Status (Long Poll)
  kind: query
  command: "/SyncStatus?timeout={seconds}&etag={etag-value}"
  params:
    - name: seconds
      type: integer
      description: Polling interval in seconds; recommended 180s.
    - name: etag-value
      type: string
      description: etag attribute from previous /SyncStatus response.

- id: set_volume_level
  label: Set Volume (Level 0..100)
  kind: action
  command: "/Volume?level={level}&tell_slaves={on_off}"
  params:
    - name: level
      type: integer
      description: Absolute volume level, integer 0..100.
    - name: on_off
      type: integer
      description: 1 propagates change to grouped players, 0 only selected player.

- id: set_volume_mute
  label: Set Mute
  kind: action
  command: "/Volume?mute={on_off}&tell_slaves={on_off}"
  params:
    - name: on_off
      type: integer
      description: 0 mutes, 1 unmutes.

- id: set_volume_abs_db
  label: Set Volume (Absolute dB)
  kind: action
  command: "/Volume?abs_db={db}&tell_slaves={on_off}"
  params:
    - name: db
      type: number
      description: Absolute dB level (constrained to configured volume range, typically -80..0).
    - name: on_off
      type: integer
      description: 1 propagates change to grouped players, 0 only selected player.

- id: volume_up
  label: Volume Up
  kind: action
  command: "/Volume?db={db_value}"
  params:
    - name: db_value
      type: number
      description: Positive dB step (typical value 2dB).

- id: volume_down
  label: Volume Down
  kind: action
  command: "/Volume?db=-{db_value}"
  params:
    - name: db_value
      type: number
      description: Positive dB step (typical value 2dB).

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
      description: Position in current track; only valid if /Status response includes totlen.
- id: play_seek_track
  label: Play at Seek in Track
  kind: action
  command: "/Play?seek={seconds}&id={trackid}"
  params:
    - name: seconds
      type: integer
      description: Position in track (seconds).
    - name: trackid
      type: integer
      description: Track number in queue.
- id: play_url
  label: Play Stream URL
  kind: action
  command: "/Play?url={encodedStreamURL}"
  params:
    - name: encodedStreamURL
      type: string
      description: URL-encoded URL of streamed custom audio.

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
  label: Skip to Next Track
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
      description: 0 disable shuffle, 1 enable shuffle.

- id: repeat
  label: Set Repeat
  kind: action
  command: "/Repeat?state={state}"
  params:
    - name: state
      type: integer
      description: 0 repeat queue, 1 repeat track, 2 repeat off.

- id: radio_action
  label: Streaming Radio Station Action
  kind: action
  command: "/Action?service={service-name}&{action-URL}"
  params:
    - name: service-name
      type: string
      description: Service identifier (e.g. Slacker, Radio Paradise).
    - name: action-URL
      type: string
      description: Query string from action URL attribute in /Status response (e.g. skip=4799148, love=4799148, ban=4799148).

- id: list_playlist
  label: List Play Queue Tracks
  kind: query
  command: "/Playlist"
  params: []
- id: list_playlist_status
  label: List Play Queue Status
  kind: query
  command: "/Playlist?length=1"
  params: []
- id: list_playlist_range
  label: List Play Queue Range
  kind: query
  command: "/Playlist?start={first}&end={last}"
  params:
    - name: first
      type: integer
      description: First entry in the queue to include (starting from 0).
    - name: last
      type: integer
      description: Last entry in the queue to include.

- id: delete_track
  label: Delete A Track
  kind: action
  command: "/Delete?id={position}"
  params:
    - name: position
      type: integer
      description: Track id of the track to be deleted from current play queue.

- id: move_track
  label: Move A Track
  kind: action
  command: "/Move?new={destination}&old={origin}"
  params:
    - name: destination
      type: integer
      description: New position of the track being moved.
    - name: origin
      type: integer
      description: Old position of the track being moved.

- id: clear_queue
  label: Clear Queue
  kind: action
  command: "/Clear"
  params: []
- id: save_queue
  label: Save Queue As Playlist
  kind: action
  command: "/Save?name={playlist_name}"
  params:
    - name: playlist_name
      type: string
      description: The saved play queue name.

- id: list_presets
  label: List Presets
  kind: query
  command: "/Presets"
  params: []
- id: load_preset
  label: Load Preset
  kind: action
  command: "/Preset?id={presetId}"
  params:
    - name: presetId
      type: integer
      description: Preset id (from /Presets). +1 loads next preset, -1 loads previous preset.

- id: browse
  label: Browse Music Content
  kind: query
  command: "/Browse"
  params: []
- id: browse_key
  label: Browse Music Content (By Key)
  kind: query
  command: "/Browse?key={key-value}"
  params:
    - name: key-value
      type: string
      description: URL-encoded value from browseKey/nextKey/parentKey/contextMenuKey.
- id: browse_key_with_context
  label: Browse With Inline Context Menu
  kind: query
  command: "/Browse?key={key-value}&withContextMenuItems=1"
  params:
    - name: key-value
      type: string
      description: URL-encoded browse key.
- id: browse_search
  label: Search Music Content
  kind: query
  command: "/Browse?key={key-value}&q={searchText}"
  params:
    - name: key-value
      type: string
      description: URL-encoded searchKey from previous response.
    - name: searchText
      type: string
      description: Search string.

- id: group_two_players
  label: Group One Secondary Player
  kind: action
  command: "/AddSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}&group={GroupName}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: IP address of the secondary player.
    - name: secondaryPlayerPort
      type: integer
      description: Port number of the secondary player; default 11000.
    - name: GroupName
      type: string
      description: Optional group name. If omitted, BluOS assigns a default name.

- id: group_multiple_players
  label: Group Multiple Players
  kind: action
  command: "/AddSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated IP addresses of secondary players.
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated ports of secondary players.

- id: remove_one_player
  label: Remove One Player From Group
  kind: action
  command: "/RemoveSlave?slave={secondaryPlayerIP}&port={secondaryPlayerPort}"
  params:
    - name: secondaryPlayerIP
      type: string
      description: IP of secondary player to ungroup.
    - name: secondaryPlayerPort
      type: integer
      description: Port of secondary player to ungroup.

- id: remove_multiple_players
  label: Remove Multiple Players From Group
  kind: action
  command: "/RemoveSlave?slaves={secondaryPlayerIPs}&ports={secondaryPlayerPorts}"
  params:
    - name: secondaryPlayerIPs
      type: string
      description: Comma-separated IPs of secondary players to remove.
    - name: secondaryPlayerPorts
      type: string
      description: Comma-separated ports of secondary players to remove.

- id: reboot
  label: Soft Reboot Player
  kind: action
  command: "POST /reboot"
  params:
    - name: yes
      type: string
      description: Any value (e.g. 1); sent as form body via curl -d yes=1.

- id: doorbell
  label: Play Doorbell Chime
  kind: action
  command: "/Doorbell?play=1"
  params: []

- id: active_input_select
  label: Active Input Selection
  kind: action
  command: "/Play?url={URL_value}"
  params:
    - name: URL_value
      type: string
      description: URL attribute from /RadioBrowse?service=Capture response.

- id: radio_browse_capture
  label: List Active Inputs (Capture)
  kind: query
  command: "/RadioBrowse?service=Capture"
  params: []

- id: external_input_select_legacy
  label: External Input Selection (firmware >3.8.0 and <4.2.0)
  kind: action
  command: "/Play?inputIndex={IndexId}"
  params:
    - name: IndexId
      type: integer
      description: 1-based index of inputs from /Settings?id=capture&schemaVersion=32 (Bluetooth excluded).

- id: external_input_select_new
  label: External Input Selection (firmware v4.2.0+)
  kind: action
  command: "/Play?inputTypeIndex={type-index}"
  params:
    - name: type-index
      type: string
      description: "Format _type-index_ (e.g. spdif-2). Type: spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone."

- id: settings_capture
  label: Get Capture Settings
  kind: query
  command: "/Settings?id=capture&schemaVersion=32"
  params: []

- id: change_bluetooth_mode
  label: Change Bluetooth Mode
  kind: action
  command: "/audiomodes?bluetoothAutoplay={value}"
  params:
    - name: value
      type: integer
      description: 0 Manual, 1 Automatic, 2 Guest, 3 Disabled.
```

## Feedbacks
```yaml
- id: playback_state
  type: enum
  values: [play, pause, stop, stream, connecting]
- id: volume_percent
  type: integer
  values: 0..100  # -1 means fixed volume
- id: volume_db
  type: number
- id: mute_state
  type: enum
  values: [muted, unmuted]
- id: repeat_state
  type: enum
  values: [repeat_queue, repeat_track, repeat_off]  # 0, 1, 2
- id: shuffle_state
  type: enum
  values: [off, on]
- id: track_metadata
  type: object
- id: group_state
  type: object
- id: battery
  type: object
```

## Variables
```yaml
# UNRESOLVED: source describes state attributes and response elements but no separate settable variables outside of command parameters
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications separate from polling responses
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source mentions "user confirmation should be requested" for delete context-menu actions on playlists (section 7.1); no explicit safety warnings, interlock procedures, or power-on sequencing requirements are documented.
```

## Notes
- Default port 11000; CI580 node 2 = 11010, node 3 = 11020, node 4 = 11030. Actual port should be discovered via mDNS services `musc.tcp` and `musp.tcp`.
- Polling: regular polling rate-limited to at most one request every 30s. Long-polling requests for the same resource must be at least 1 second apart.
- All parameter values must be URL-encoded.
- Volume is constrained to the configured available range (typically -80..0 dB), adjustable via the BluOS Controller app at Settings -> Player -> Audio.
- `/Status` from secondary players reflects the primary player's status; use `/SyncStatus` long-polling to track per-secondary volume.
- Section 11.2 documents two firmware ranges: `inputIndex` (firmware >3.8.0 and <4.2.0) and `inputTypeIndex` (firmware v4.2.0 or newer).
- The source document is a general BluOS Custom Integration API applicable to Bluesound, NAD Electronics, and DALI BluOS-enabled players; the device name "Bluesound NAD Napster" provided by the operator does not appear in the source.

<!-- UNRESOLVED: many fields documented in source response attributes (etag, syncStat, title1/title2/title3, image, service, sid, pid, prid, totlen, secs, db, muteDb, muteVolume, offsetDb, alarmsecondsremaining, etc.) are observable but not enumerated above; expand Feedbacks if full fidelity required. -->
```

<!-- UNRESOLVED: LSDP (Lenbrook Service Discovery Protocol, UDP broadcast port 11430) is documented in source section 13 but not exposed above; no transport entry for udp included. -->

## Provenance

```yaml
source_domains:
  - content-bluesound-com.s3.amazonaws.com
  - bluesound.com
source_urls:
  - https://content-bluesound-com.s3.amazonaws.com/uploads/BluOS-Custom-Integration-API_v1.7.pdf
  - https://www.bluesound.com/pages/downloads
  - https://content-bluesound-com.s3.amazonaws.com/uploads/2024/04/BluOS_Integration_Utility_v1.8.1.zip
retrieved_at: 2026-05-21T14:04:05.164Z
last_checked_at: 2026-09-13T22:17:44.396Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-13T22:17:44.396Z
matched_actions: 48
action_count: 48
confidence: medium
summary: "All 48 spec actions match source endpoints literally with correct parameter shapes; every BluOS CI command endpoint is represented. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device-name \"Bluesound NAD Napster\" supplied by operator does not appear in source; source covers the generic BluOS Custom Integration API applicable across Bluesound/NAD/DALI BluOS players."
- "CI580 node-specific ports (11010, 11020, 11030) per source are not represented above."
- "source describes state attributes and response elements but no separate settable variables outside of command parameters"
- "source does not document unsolicited notifications separate from polling responses"
- "source does not document multi-step macro sequences"
- "source mentions \"user confirmation should be requested\" for delete context-menu actions on playlists (section 7.1); no explicit safety warnings, interlock procedures, or power-on sequencing requirements are documented."
- "many fields documented in source response attributes (etag, syncStat, title1/title2/title3, image, service, sid, pid, prid, totlen, secs, db, muteDb, muteVolume, offsetDb, alarmsecondsremaining, etc.) are observable but not enumerated above; expand Feedbacks if full fidelity required."
- "LSDP (Lenbrook Service Discovery Protocol, UDP broadcast port 11430) is documented in source section 13 but not exposed above; no transport entry for udp included."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
