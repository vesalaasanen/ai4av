---
spec_id: admin/nad-t777-with-volume-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NAD T777 (with Volume) Series Control Spec"
manufacturer: NAD
model_family: "NAD T777 (with Volume) Series"
aliases: []
compatible_with:
  manufacturers:
    - NAD
  models:
    - "NAD T777 (with Volume) Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-05-16T23:22:08.426Z
last_checked_at: 2026-05-16T23:22:08.426Z
generated_at: 2026-05-16T23:22:08.426Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - /Presets
  - /Playlist
  - "The source document is the BluOS Custom Integration API shared across NAD, Bluesound, and DALI products; no NAD-T777-specific command set or feature exclusions are documented. Input types available depend on physical hardware."
  - "No persistent settable parameters beyond what is covered in Actions and Feedbacks are described in the source."
  - "No multi-step macros are explicitly documented in the source."
  - "RS-232C/serial protocol mentioned in the intake form is not documented in this source. If the NAD T777 has a separate RS-232C command set, it would require a different source document."
  - "Authentication — source describes no login or credential mechanism. auth.type set to none by Tier 2 inference."
  - "Firmware version compatibility for the T777 model specifically is not stated."
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-05-16T23:22:08.426Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 spec actions matched verbatim source endpoints; transport port 11000 confirmed; only 2 query-only endpoints absent, below short threshold. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-17
---

# NAD T777 (with Volume) Series Control Spec

## Summary

The NAD T777 (with Volume) Series is a BluOS-enabled AV receiver controlled via the BluOS Custom Integration API (version 1.7). All commands are issued as HTTP GET requests (or POST for reboot) to the player's IP address on TCP port 11000. Responses are UTF-8 encoded XML. The API covers playback control, volume/mute, queue management, preset management, input selection, player grouping, and content browsing.

<!-- UNRESOLVED: The source document is the BluOS Custom Integration API shared across NAD, Bluesound, and DALI products; no NAD-T777-specific command set or feature exclusions are documented. Input types available depend on physical hardware. -->

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
- queryable    # inferred from /Status, /SyncStatus, /Volume query commands
- levelable    # inferred from volume level and dB control commands
- routable     # inferred from direct input selection commands (/Play?url=, /Play?inputTypeIndex=)
```

## Actions

```yaml
- id: play
  label: Play
  kind: action
  params: []

- id: play_seek
  label: Play with Seek
  kind: action
  params:
    - name: seek
      type: integer
      description: Jump to position in seconds within the current track
    - name: id
      type: integer
      description: Optional track id in the queue (0-based position)

- id: play_url
  label: Play Stream URL
  kind: action
  params:
    - name: url
      type: string
      description: URL-encoded stream URL to play

- id: pause
  label: Pause
  kind: action
  params: []

- id: pause_toggle
  label: Pause Toggle
  kind: action
  params:
    - name: toggle
      type: integer
      description: Set to 1 to toggle current pause state

- id: stop
  label: Stop
  kind: action
  params: []

- id: skip
  label: Skip to Next Track
  kind: action
  params: []

- id: back
  label: Back / Previous Track
  kind: action
  params: []

- id: set_volume_level
  label: Set Volume Level
  kind: action
  params:
    - name: level
      type: integer
      description: Absolute volume level 0–100
    - name: tell_slaves
      type: integer
      description: "0 = only this player; 1 = all players in group"

- id: set_volume_abs_db
  label: Set Volume (Absolute dB)
  kind: action
  params:
    - name: abs_db
      type: number
      description: Absolute volume in dB
    - name: tell_slaves
      type: integer
      description: "0 = only this player; 1 = all players in group"

- id: set_volume_relative_db
  label: Set Volume (Relative dB)
  kind: action
  params:
    - name: db
      type: number
      description: Relative dB change; positive = up, negative = down
    - name: tell_slaves
      type: integer
      description: "0 = only this player; 1 = all players in group"

- id: mute_on
  label: Mute
  kind: action
  params: []

- id: mute_off
  label: Unmute
  kind: action
  params: []

- id: shuffle
  label: Set Shuffle
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = disable shuffle, 1 = enable shuffle"

- id: repeat
  label: Set Repeat
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = repeat queue, 1 = repeat track, 2 = repeat off"

- id: load_preset
  label: Load Preset
  kind: action
  params:
    - name: id
      type: string
      description: "Preset id, or +1 for next preset, -1 for previous preset"

- id: queue_delete_track
  label: Delete Track from Queue
  kind: action
  params:
    - name: id
      type: integer
      description: Track id/position to delete from play queue

- id: queue_move_track
  label: Move Track in Queue
  kind: action
  params:
    - name: old
      type: integer
      description: Current (old) position of the track
    - name: new
      type: integer
      description: Destination (new) position of the track

- id: queue_clear
  label: Clear Play Queue
  kind: action
  params: []

- id: queue_save
  label: Save Play Queue
  kind: action
  params:
    - name: name
      type: string
      description: Name to save the play queue as

- id: select_input_active
  label: Select Active Input (by URL)
  kind: action
  params:
    - name: url
      type: string
      description: URL-encoded input capture URL from /RadioBrowse?service=Capture

- id: select_input_by_type_index
  label: Select Input by Type and Index (BluOS v4.2.0+)
  kind: action
  params:
    - name: inputTypeIndex
      type: string
      description: "Input type-index string, e.g. spdif-1, analog-1, bluetooth-1, arc-1, earc-1, phono-1, coax-1, computer-1, aesebu-1, balanced-1, microphone-1"

- id: select_input_by_index
  label: Select Input by Index (BluOS v3.8.0–v4.2.0)
  kind: action
  params:
    - name: inputIndex
      type: integer
      description: 1-based index of input from /Settings?id=capture (Bluetooth excluded)

- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  params:
    - name: bluetoothAutoplay
      type: integer
      description: "0 = Manual, 1 = Automatic, 2 = Guest, 3 = Disabled"

- id: group_add_slave
  label: Add Player to Group
  kind: action
  params:
    - name: slave
      type: string
      description: IP address of secondary player
    - name: port
      type: integer
      description: Port of secondary player (default 11000)
    - name: group
      type: string
      description: Optional group name

- id: group_remove_slave
  label: Remove Player from Group
  kind: action
  params:
    - name: slave
      type: string
      description: IP address of secondary player to remove
    - name: port
      type: integer
      description: Port of secondary player

- id: reboot
  label: Soft Reboot Player
  kind: action
  params: []

- id: doorbell_chime
  label: Play Doorbell Chime
  kind: action
  params: []

- id: browse
  label: Browse Content
  kind: action
  params:
    - name: key
      type: string
      description: Optional URL-encoded browse key from a prior /Browse response; omit for top-level browse
    - name: withContextMenuItems
      type: integer
      description: "Set to 1 to include inline context menus in response"

- id: search_content
  label: Search Music Content
  kind: action
  params:
    - name: key
      type: string
      description: searchKey value from a prior /Browse response
    - name: q
      type: string
      description: Search string

- id: streaming_radio_action
  label: Streaming Radio Action (skip/back/love/ban)
  kind: action
  params:
    - name: service
      type: string
      description: Service name (e.g. Slacker)
    - name: action_param
      type: string
      description: Action-specific parameter (e.g. skip=trackid, ban=trackid, love=trackid) as provided in the /Status response actions element
```

## Feedbacks

```yaml
- id: playback_status
  label: Playback Status
  type: object
  description: Full playback and volume status from /Status endpoint
  fields:
    - name: state
      type: enum
      values: [play, pause, stop, stream, connecting]
    - name: volume
      type: integer
      description: "0–100 or -1 for fixed volume"
    - name: mute
      type: integer
      description: "1 = muted, 0 = unmuted"
    - name: db
      type: number
      description: Volume level in dB
    - name: title1
      type: string
    - name: title2
      type: string
    - name: title3
      type: string
    - name: artist
      type: string
    - name: album
      type: string
    - name: shuffle
      type: integer
      description: "0 = off, 1 = on"
    - name: repeat
      type: integer
      description: "0 = repeat queue, 1 = repeat track, 2 = off"
    - name: secs
      type: integer
      description: Elapsed seconds of current track
    - name: totlen
      type: integer
      description: Total track length in seconds
    - name: service
      type: string
    - name: syncStat
      type: string
      description: Sync status id; matches /SyncStatus syncStat attribute

- id: sync_status
  label: Player and Group Sync Status
  type: object
  description: Player identity and grouping information from /SyncStatus endpoint
  fields:
    - name: volume
      type: integer
      description: "0–100 or -1 for fixed volume"
    - name: mute
      type: integer
      description: "1 = muted, 0 = not muted"
    - name: name
      type: string
      description: Player name
    - name: modelName
      type: string
    - name: group
      type: string
    - name: initialized
      type: boolean
    - name: syncStat
      type: string

- id: volume_state
  label: Volume State
  type: object
  description: Response from /Volume query or command
  fields:
    - name: volume
      type: integer
      description: Current volume 0–100 or -1 for fixed
    - name: db
      type: number
    - name: mute
      type: integer
    - name: muteDb
      type: number
    - name: muteVolume
      type: integer
```

## Variables

```yaml
# UNRESOLVED: No persistent settable parameters beyond what is covered in Actions and Feedbacks are described in the source.
```

## Events

```yaml
- id: status_change
  label: Status Changed (Long Poll)
  description: Long-polling /Status returns when player state changes before the timeout expires. Use etag from previous response; timeout recommended 100s, minimum 10s between polls.

- id: sync_status_change
  label: Sync Status Changed (Long Poll)
  description: Long-polling /SyncStatus returns when player grouping or volume changes. Recommended poll interval 180s.
```

## Macros

```yaml
# UNRESOLVED: No multi-step macros are explicitly documented in the source.
```

## Safety

```yaml
confirmation_required_for:
  - reboot
interlocks: []
# Note: The /reboot endpoint uses HTTP POST (not GET). All other commands are HTTP GET.
```

## Notes

- All requests use the form `http://<player_ip>:11000/<endpoint>?params`. Port 11000 applies to all standard BluOS players. The NAD CI580 (4-streamer chassis) uses ports 11000, 11010, 11020, 11030 for nodes 1–4.
- Player discovery uses mDNS (services `_musc._tcp`, `_musp._tcp`) or the proprietary LSDP protocol on UDP port 11430.
- Long polling is supported on /Status and /SyncStatus. When not long-polling, clients should poll no faster than once every 30 seconds. When long-polling, do not make two consecutive requests for the same resource less than 1 second apart.
- Volume commands (level, abs_db, db, mute) can apply to the entire group by adding `tell_slaves=1`.
- The /mute parameter uses inverted logic for the Set Volume endpoint: `mute=0` mutes the player, `mute=1` unmutes. (Confirmed from source: "If set to 0, the player is muted. If set to 1, the player is unmuted.")
- Input selection: use `/Play?inputTypeIndex=<type>-<index>` for BluOS v4.2.0+; use `/Play?inputIndex=<n>` for v3.8.0–v4.2.0; use `/Play?url=<capture-url>` for active input selection via /RadioBrowse.
- Reboot is via HTTP POST: `curl -d yes=1 http://<player_ip>/reboot`.
- The source document (BluOS Custom Integration API v1.7) is shared across NAD, Bluesound, and DALI products. NAD T777-specific input availability depends on the physical hardware.
- The `entity_id` in this spec is set to `nad_t777_with_volume_series` as provided; the known protocol listed as RS-232C in the intake form does not match the source document, which describes HTTP only.

<!-- UNRESOLVED: RS-232C/serial protocol mentioned in the intake form is not documented in this source. If the NAD T777 has a separate RS-232C command set, it would require a different source document. -->
<!-- UNRESOLVED: Authentication — source describes no login or credential mechanism. auth.type set to none by Tier 2 inference. -->
<!-- UNRESOLVED: Firmware version compatibility for the T777 model specifically is not stated. -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-05-16T23:22:08.426Z
last_checked_at: 2026-05-16T23:22:08.426Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T23:22:08.426Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 spec actions matched verbatim source endpoints; transport port 11000 confirmed; only 2 query-only endpoints absent, below short threshold. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- /Presets
- /Playlist
- "The source document is the BluOS Custom Integration API shared across NAD, Bluesound, and DALI products; no NAD-T777-specific command set or feature exclusions are documented. Input types available depend on physical hardware."
- "No persistent settable parameters beyond what is covered in Actions and Feedbacks are described in the source."
- "No multi-step macros are explicitly documented in the source."
- "RS-232C/serial protocol mentioned in the intake form is not documented in this source. If the NAD T777 has a separate RS-232C command set, it would require a different source document."
- "Authentication — source describes no login or credential mechanism. auth.type set to none by Tier 2 inference."
- "Firmware version compatibility for the T777 model specifically is not stated."
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
