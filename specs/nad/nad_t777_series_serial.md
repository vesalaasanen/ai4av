---
spec_id: admin/nad-t777-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NAD T777 Series Control Spec"
manufacturer: NAD
model_family: "NAD T777 Series"
aliases: []
compatible_with:
  manufacturers:
    - NAD
  models:
    - "NAD T777 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-05-19T04:27:33.193Z
last_checked_at: 2026-06-10T00:28:10.994Z
generated_at: 2026-06-10T00:28:10.994Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The input \"Known protocol: RS-232C\" conflicts with the source document, which describes an HTTP/TCP API only. No RS-232 or serial command table was found in the source. This spec documents the HTTP control interface as found in the source. If a separate RS-232 spec exists for this device, it is not covered here."
  - "no settable parameters distinct from Actions found in source beyond what is covered above"
  - "whether BluOS sends any true unsolicited UDP or TCP notifications outside LSDP discovery"
  - "no multi-step macros described explicitly in source"
  - "no safety warnings or interlock procedures described in source."
  - "RS-232/serial command set for the NAD T777 Series not found in this source document. If serial control is required, a separate source document covering the RS-232 protocol is needed."
  - "Authentication — source describes no login/auth procedure; inferred none required."
  - "Firmware version compatibility range for NAD T777 Series specifically not stated; BluOS API v1.7 referenced generically across NAD, Bluesound, DALI products."
verification:
  verdict: verified
  checked_at: 2026-06-10T00:28:10.994Z
  matched_actions: 32
  action_count: 32
  confidence: medium
  summary: "All 32 spec actions match documented BluOS API endpoints; transport values are source-verbatim; all 35 source-side command units are represented across actions and feedbacks. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-17
---

# NAD T777 Series Control Spec

## Summary

The NAD T777 Series uses the BluOS platform (BluOS Custom Integration API v1.7) for network control. All commands are sent as HTTP GET requests to the player's IP address on port 11000; the player responds with UTF-8 encoded XML data. This spec covers playback control, volume control, play queue management, presets, content browsing, player grouping, and input selection as documented in the BluOS Custom Integration API.

<!-- UNRESOLVED: The input "Known protocol: RS-232C" conflicts with the source document, which describes an HTTP/TCP API only. No RS-232 or serial command table was found in the source. This spec documents the HTTP control interface as found in the source. If a separate RS-232 spec exists for this device, it is not covered here. -->

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
traits:
  - queryable    # inferred from query command examples (/Status, /SyncStatus, /Volume, /Playlist, /Presets)
  - levelable    # inferred from volume control commands (/Volume with level, db, abs_db, mute parameters)
  - routable     # inferred from input selection commands (/Play?url=, /Play?inputTypeIndex=)
```

## Actions

```yaml
# Playback Control
- id: play
  label: Play
  kind: action
  params:
    - name: seek
      type: integer
      description: Optional. Jump to specified position in current track (seconds). Only valid if /Status includes <totlen>.
    - name: url
      type: string
      description: Optional. URL-encoded stream URL to play directly.

- id: pause
  label: Pause
  kind: action
  params:
    - name: toggle
      type: integer
      description: Optional. If set to 1, toggles the current pause state.

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

- id: shuffle
  label: Set Shuffle
  kind: action
  params:
    - name: state
      type: integer
      description: "0 to disable shuffle, 1 to enable shuffle."

- id: repeat
  label: Set Repeat
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = repeat queue, 1 = repeat current track, 2 = repeat off."

# Volume Control
- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Absolute volume level 0-100.
    - name: tell_slaves
      type: integer
      description: Optional. 0 = only this player; 1 = all grouped players.

- id: set_volume_db
  label: Set Volume (Absolute dB)
  kind: action
  params:
    - name: abs_db
      type: number
      description: Absolute volume level in dB.
    - name: tell_slaves
      type: integer
      description: Optional. 0 = only this player; 1 = all grouped players.

- id: adjust_volume_db
  label: Adjust Volume (Relative dB)
  kind: action
  params:
    - name: db
      type: number
      description: Relative volume change in dB (positive = up, negative = down). Typical value ±2 dB.
    - name: tell_slaves
      type: integer
      description: Optional. 0 = only this player; 1 = all grouped players.

- id: mute
  label: Mute
  kind: action
  params: []

- id: unmute
  label: Unmute
  kind: action
  params: []

# Streaming radio station actions
- id: radio_action
  label: Radio Station Action (Skip/Back/Love/Ban)
  kind: action
  params:
    - name: service
      type: string
      description: Service name (e.g. Slacker).
    - name: action_url
      type: string
      description: Action URL as provided in the <action> element from /Status response.

# Play Queue Management
- id: list_queue
  label: List Play Queue
  kind: action
  params:
    - name: start
      type: integer
      description: Optional. First queue entry (0-based) for pagination.
    - name: end
      type: integer
      description: Optional. Last queue entry for pagination.

- id: delete_track
  label: Delete Track from Queue
  kind: action
  params:
    - name: id
      type: integer
      description: Track id (position) to remove from the queue.

- id: move_track
  label: Move Track in Queue
  kind: action
  params:
    - name: old
      type: integer
      description: Current position of the track.
    - name: new
      type: integer
      description: Destination position for the track.

- id: clear_queue
  label: Clear Play Queue
  kind: action
  params: []

- id: save_queue
  label: Save Play Queue as Playlist
  kind: action
  params:
    - name: name
      type: string
      description: Name for the saved playlist.

# Presets
- id: list_presets
  label: List Presets
  kind: action
  params: []

- id: load_preset
  label: Load Preset
  kind: action
  params:
    - name: id
      type: string
      description: "Preset id to load, or '+1' for next preset, or '-1' for previous preset."

# Content Browsing
- id: browse
  label: Browse Music Content
  kind: action
  params:
    - name: key
      type: string
      description: Optional. URL-encoded browse key from a previous response. Absent for top-level browse.
    - name: withContextMenuItems
      type: integer
      description: Optional. Set to 1 to include inline context menus.

- id: search
  label: Search Music Content
  kind: action
  params:
    - name: key
      type: string
      description: Search key from searchKey attribute of a previous response.
    - name: q
      type: string
      description: Search string.

# Player Grouping
- id: add_slave
  label: Group Player(s) to Primary
  kind: action
  params:
    - name: slave
      type: string
      description: IP address of the secondary player to add. For multiple players use 'slaves' (comma-separated).
    - name: port
      type: integer
      description: Port of the secondary player (default 11000).
    - name: group
      type: string
      description: Optional. Group name; BluOS assigns default if omitted.

- id: remove_slave
  label: Remove Player(s) from Group
  kind: action
  params:
    - name: slave
      type: string
      description: IP address of the secondary player to remove. For multiple players use 'slaves' (comma-separated).
    - name: port
      type: integer
      description: Port of the secondary player.

# Player Reboot
- id: reboot
  label: Reboot Player
  kind: action
  params: []
  # Note: sent as HTTP POST to /reboot with parameter yes=1

# Doorbell Chime
- id: doorbell
  label: Play Doorbell Chime
  kind: action
  params:
    - name: play
      type: integer
      description: Always 1.

# Input Selection
- id: select_input_url
  label: Select Active Input by URL
  kind: action
  params:
    - name: url
      type: string
      description: URL-encoded input URL from /RadioBrowse?service=Capture response.

- id: select_input_by_type_index
  label: Select Input by Type and Index (BluOS v4.2.0+)
  kind: action
  params:
    - name: inputTypeIndex
      type: string
      description: "Format: type-index. Types: spdif, analog, coax, bluetooth, arc, earc, phono, computer, aesebu, balanced, microphone. Example: spdif-2 for Optical Input 2."

- id: select_input_by_index
  label: Select Input by Index (BluOS v3.8.0-v4.2.0)
  kind: action
  params:
    - name: inputIndex
      type: integer
      description: Index (1-based) of input from /Settings?id=capture response; Bluetooth excluded.

# Bluetooth Mode
- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  params:
    - name: bluetoothAutoplay
      type: integer
      description: "0 = Manual, 1 = Automatic, 2 = Guest, 3 = Disabled."
- id: radio_browse
  label: Browse Radio or Input Sources
  kind: action
  params:
    - name: service
      type: string
      description: "Service to browse. Use 'Capture' to retrieve available input source URLs for input selection via select_input_url."

- id: get_capture_settings
  label: Get Capture Input Settings
  kind: action
  params:
    - name: id
      type: string
      description: "Settings group id. Use 'capture' to retrieve external input sources and their indices for use with select_input_by_index."
    - name: schemaVersion
      type: integer
      description: "Optional. Settings schema version (e.g., 32 for the latest schema version)."
```

## Feedbacks

```yaml
# Playback Status (/Status)
- id: playback_status
  label: Playback Status
  type: object
  description: "Returns playback and volume state. Key fields: state (play/pause/stop/stream/connecting), volume (0-100 or -1 for fixed), mute (0/1), title1, title2, title3, artist, album, shuffle (0/1), repeat (0/1/2), totlen, secs, service, streamFormat, syncStat."
  endpoint: /Status
  polling_note: "Long polling supported via timeout and etag parameters. Recommended long-poll interval: 100s. Regular polling: no faster than every 30s."

# Player / Group Sync Status (/SyncStatus)
- id: sync_status
  label: Player and Group Sync Status
  type: object
  description: "Returns player name, volume, mute state, group membership, model, brand, and IP/port of master and slaves. Key fields: volume, mute, name, model, brand, group, master, slave(s)."
  endpoint: /SyncStatus
  polling_note: "Long polling supported. Recommended interval: 180s."

# Volume (/Volume query)
- id: volume_state
  label: Volume State
  type: object
  description: "Returns current volume (0-100 or -1 for fixed), mute state (0/1), volume in dB, muteDb, muteVolume."
  endpoint: /Volume

# Play Queue (/Playlist)
- id: queue_status
  label: Play Queue Status
  type: object
  description: "Returns queue length, id, name, modified flag, and optionally track details."
  endpoint: /Playlist

# Presets (/Presets)
- id: presets_list
  label: Presets List
  type: object
  description: "Returns list of presets (id, name, url, image) and the prid."
  endpoint: /Presets

# Sync with /Status via syncStat field for /SyncStatus changes
```

## Variables

```yaml
# UNRESOLVED: no settable parameters distinct from Actions found in source beyond what is covered above
```

## Events

```yaml
# Long-polling on /Status and /SyncStatus provides unsolicited-style change notification when state changes.
# No push/unsolicited notification mechanism (webhook, socket, etc.) described in source beyond long polling.
# UNRESOLVED: whether BluOS sends any true unsolicited UDP or TCP notifications outside LSDP discovery
```

## Macros

```yaml
# UNRESOLVED: no multi-step macros described explicitly in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures described in source.
# Note: /reboot sends a soft reboot; no confirmation described in API.
```

## Notes

**Protocol note:** Despite the input label "RS-232C," the source document (BluOS Custom Integration API v1.7) documents an HTTP/TCP REST-style protocol only. All requests are HTTP GET (except /reboot which is HTTP POST) to `http://<player_ip>:11000/<endpoint>`. No serial/RS-232 command table was found in the source.

**Port:** 11000 is used for all standard BluOS players. The NAD CI580 (a multi-streamer chassis) uses ports 11000, 11010, 11020, 11030 for nodes 1–4 respectively. Actual port should be discovered via mDNS (services `musc._tcp` and `musp._tcp`) or LSDP (Lenbrook Service Discovery Protocol, UDP broadcast port 11430).

**Long polling:** BluOS supports long polling for `/Status` and `/SyncStatus`. Use `timeout` (seconds) and `etag` (from previous response root attribute) parameters. Do not poll faster than once per second even with long polling; regular polling no faster than once per 30 seconds.

**Input selection firmware variants:** `/Play?inputTypeIndex=` is for BluOS firmware v4.2.0 and newer. `/Play?inputIndex=` is for firmware v3.8.0 to v4.2.0. Use `/RadioBrowse?service=Capture` + `/Play?url=` for the URL-based method (all firmware).

**Player grouping terminology:** BluOS calls the main player the "primary player" and attached players "secondary players." Requests directed to a secondary player for playback control are internally proxied to the primary player.

**Response format:** All responses are UTF-8 encoded XML. The root element varies by endpoint. Undocumented response attributes should be ignored per API guidance.

**Discovery:** LSDP (Lenbrook Service Discovery Protocol) uses UDP broadcast on port 11430. Class ID 0x0001 = BluOS Player (`_musc._tcp`).

<!-- UNRESOLVED: RS-232/serial command set for the NAD T777 Series not found in this source document. If serial control is required, a separate source document covering the RS-232 protocol is needed. -->
<!-- UNRESOLVED: Authentication — source describes no login/auth procedure; inferred none required. -->
<!-- UNRESOLVED: Firmware version compatibility range for NAD T777 Series specifically not stated; BluOS API v1.7 referenced generically across NAD, Bluesound, DALI products. -->

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-05-19T04:27:33.193Z
last_checked_at: 2026-06-10T00:28:10.994Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T00:28:10.994Z
matched_actions: 32
action_count: 32
confidence: medium
summary: "All 32 spec actions match documented BluOS API endpoints; transport values are source-verbatim; all 35 source-side command units are represented across actions and feedbacks. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The input \"Known protocol: RS-232C\" conflicts with the source document, which describes an HTTP/TCP API only. No RS-232 or serial command table was found in the source. This spec documents the HTTP control interface as found in the source. If a separate RS-232 spec exists for this device, it is not covered here."
- "no settable parameters distinct from Actions found in source beyond what is covered above"
- "whether BluOS sends any true unsolicited UDP or TCP notifications outside LSDP discovery"
- "no multi-step macros described explicitly in source"
- "no safety warnings or interlock procedures described in source."
- "RS-232/serial command set for the NAD T777 Series not found in this source document. If serial control is required, a separate source document covering the RS-232 protocol is needed."
- "Authentication — source describes no login/auth procedure; inferred none required."
- "Firmware version compatibility range for NAD T777 Series specifically not stated; BluOS API v1.7 referenced generically across NAD, Bluesound, DALI products."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
