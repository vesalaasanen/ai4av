---
spec_id: admin/nad-m17-v2-series-ip
schema_version: ai4av-public-spec-v1
revision: 1
title: "NAD M17 V2 Series Control Spec"
manufacturer: NAD
model_family: "NAD M17 V2 Series"
aliases: []
compatible_with:
  manufacturers:
    - NAD
  models:
    - "NAD M17 V2 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-06-03T07:25:59.702Z
last_checked_at: 2026-06-03T07:25:59.702Z
generated_at: 2026-06-03T07:25:59.702Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source document is the BluOS Custom Integration API v1.7, which covers all BluOS-based NAD products. Device-specific input types and physical input count for the M17 V2 are not enumerated in this document."
  - "BluOS uses long-polling rather than unsolicited push events. Clients detect"
  - "No multi-step macros are described explicitly in the source."
  - "M17 V2 Series-specific input list (physical connectors and their inputTypeIndex strings) is not enumerated in the BluOS API document. Integrators must query /RadioBrowse?service=Capture or /Settings?id=capture to discover available inputs at runtime."
  - "Firmware version compatibility ranges (which BluOS firmware versions ship on NAD M17 V2) are not stated in source."
  - "Whether the NAD M17 V2 supports the Doorbell Chime endpoint or BluOS HUB inputs is not confirmed in this document."
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-06-03T07:25:59.702Z
  matched_actions: 33
  action_count: 33
  confidence: medium
  summary: "Complete match (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-17
---

# NAD M17 V2 Series Control Spec

## Summary

The NAD M17 V2 Series uses the BluOS platform (BluOS Custom Integration API v1.7) for network control. All commands are HTTP GET requests sent to `http://<player_ip>:11000/<endpoint>` and responses are UTF-8 encoded XML. The spec covers playback control, volume, play queue management, presets, content browsing, player grouping, input selection, and service discovery.

<!-- UNRESOLVED: Source document is the BluOS Custom Integration API v1.7, which covers all BluOS-based NAD products. Device-specific input types and physical input count for the M17 V2 are not enumerated in this document. -->

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
- queryable    # inferred from query command examples (/Status, /SyncStatus, /Volume, /Playlist, /Presets)
- levelable    # inferred from volume control commands (/Volume with level/db/abs_db parameters)
- routable     # inferred from input selection commands (/Play?url=, /Play?inputTypeIndex=)
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
      description: Jump to specified position in seconds in the current track

- id: play_url
  label: Play URL
  kind: action
  params:
    - name: url
      type: string
      description: URL-encoded stream URL to play directly

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
      description: Set to 1 to toggle the current pause state

- id: stop
  label: Stop
  kind: action
  params: []

- id: skip
  label: Skip to Next Track
  kind: action
  params: []

- id: back
  label: Back (Previous Track or Restart)
  kind: action
  params: []

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Absolute volume level 0-100

- id: set_volume_db
  label: Set Volume (Absolute dB)
  kind: action
  params:
    - name: abs_db
      type: number
      description: Absolute volume in dB

- id: adjust_volume_db
  label: Adjust Volume (Relative dB)
  kind: action
  params:
    - name: db
      type: number
      description: Relative volume change in dB (positive or negative)

- id: mute_on
  label: Mute
  kind: action
  params: []

- id: mute_off
  label: Unmute
  kind: action
  params: []

- id: set_mute
  label: Set Mute State
  kind: action
  params:
    - name: mute
      type: integer
      description: 1 to mute, 0 to unmute

- id: shuffle
  label: Set Shuffle
  kind: action
  params:
    - name: state
      type: integer
      description: 0 to disable shuffle, 1 to enable shuffle

- id: repeat
  label: Set Repeat
  kind: action
  params:
    - name: state
      type: integer
      description: 0 to repeat queue, 1 to repeat track, 2 to turn repeat off

- id: load_preset
  label: Load Preset
  kind: action
  params:
    - name: id
      type: string
      description: Preset id to load; use +1 for next preset, -1 for previous preset

- id: delete_track
  label: Delete Track from Queue
  kind: action
  params:
    - name: id
      type: integer
      description: Track id (position) to remove from play queue

- id: move_track
  label: Move Track in Queue
  kind: action
  params:
    - name: old
      type: integer
      description: Original position of the track
    - name: new
      type: integer
      description: Destination position for the track

- id: clear_queue
  label: Clear Play Queue
  kind: action
  params: []

- id: save_queue
  label: Save Play Queue
  kind: action
  params:
    - name: name
      type: string
      description: Name to save the queue as

- id: add_slave
  label: Group Player (Add Secondary)
  kind: action
  params:
    - name: slave
      type: string
      description: IP address of the secondary player to add
    - name: port
      type: integer
      description: Port of the secondary player (typically 11000)
    - name: group
      type: string
      description: Optional group name

- id: remove_slave
  label: Ungroup Player (Remove Secondary)
  kind: action
  params:
    - name: slave
      type: string
      description: IP address of the secondary player to remove
    - name: port
      type: integer
      description: Port of the secondary player

- id: select_input_url
  label: Select Input by URL
  kind: action
  params:
    - name: url
      type: string
      description: URL-encoded input URL from /RadioBrowse?service=Capture response

- id: select_input_by_type_index
  label: Select Input by Type Index (firmware v4.2.0+)
  kind: action
  params:
    - name: inputTypeIndex
      type: string
      description: Input type-index string (e.g. spdif-1, analog-1, bluetooth-1, arc-1)

- id: select_input_by_index
  label: Select Input by Index (firmware v3.8.0-v4.2.0)
  kind: action
  params:
    - name: inputIndex
      type: integer
      description: 1-based index of inputs excluding Bluetooth from /Settings?id=capture response

- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  params:
    - name: bluetoothAutoplay
      type: integer
      description: 0=Manual, 1=Automatic, 2=Guest, 3=Disabled

- id: reboot
  label: Reboot Player
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
      description: Optional URL-encoded key from a prior browse response; omit for top-level browse

- id: search_content
  label: Search Music Content
  kind: action
  params:
    - name: key
      type: string
      description: URL-encoded searchKey value from a prior browse response
    - name: q
      type: string
      description: Search string

- id: streaming_action
  label: Streaming Radio Action (skip/back/love/ban)
  kind: action
  params:
    - name: service
      type: string
      description: Service name (e.g. Slacker)
    - name: action_url
      type: string
      description: Action URL taken from the <action> element in /Status response

- id: list_playlist
  label: List Play Queue Tracks
  kind: action
  params:
    - name: start
      type: integer
      description: Optional first entry index (0-based) for pagination
    - name: end
      type: integer
      description: Optional last entry index for pagination
```

## Feedbacks

```yaml
- id: playback_status
  label: Playback Status
  type: object
  description: Full playback state returned by GET /Status; includes state, volume, track metadata, shuffle, repeat, sleep timer, mute, sync status, and more
  poll_endpoint: /Status
  poll_interval_hint: long-poll with timeout=100&etag=<etag>

- id: player_state
  label: Player State
  type: enum
  values: [play, pause, stop, stream, connecting]
  description: Current player playback state from /Status <state> element

- id: volume_level
  label: Volume Level
  type: integer
  description: Current volume 0-100; -1 means fixed volume; from /Status or /Volume response

- id: mute_state
  label: Mute State
  type: enum
  values: ["0", "1"]
  description: 1 if muted, 0 if not muted

- id: shuffle_state
  label: Shuffle State
  type: enum
  values: ["0", "1"]
  description: 0=off, 1=on; from /Status <shuffle>

- id: repeat_state
  label: Repeat State
  type: enum
  values: ["0", "1", "2"]
  description: 0=repeat queue, 1=repeat track, 2=repeat off; from /Status <repeat>

- id: sync_status
  label: Sync Status
  type: object
  description: Player and group information returned by GET /SyncStatus; includes group name, volume, master/slave topology
  poll_endpoint: /SyncStatus
  poll_interval_hint: long-poll with timeout=180&etag=<etag>

- id: presets_list
  label: Presets List
  type: array
  description: All configured presets returned by GET /Presets

- id: play_queue
  label: Play Queue
  type: object
  description: Current play queue returned by GET /Playlist
```

## Variables

```yaml
- id: volume
  label: Volume
  type: integer
  range: [0, 100]
  description: Player volume percentage; set via /Volume?level=<value>

- id: volume_db
  label: Volume (dB)
  type: number
  description: Player volume in dB; set via /Volume?abs_db=<value>

- id: shuffle
  label: Shuffle
  type: integer
  range: [0, 1]
  description: Shuffle state; 0=off, 1=on; set via /Shuffle?state=<value>

- id: repeat
  label: Repeat
  type: integer
  range: [0, 2]
  description: Repeat mode; 0=queue, 1=track, 2=off; set via /Repeat?state=<value>

- id: bluetooth_mode
  label: Bluetooth Mode
  type: integer
  range: [0, 3]
  description: 0=Manual, 1=Automatic, 2=Guest, 3=Disabled; set via /audiomodes?bluetoothAutoplay=<value>
```

## Events

```yaml
# UNRESOLVED: BluOS uses long-polling rather than unsolicited push events. Clients detect
# state changes by monitoring etag changes in /Status and /SyncStatus long-poll responses.
# No dedicated unsolicited event push mechanism is described in the source.
```

## Macros

```yaml
# UNRESOLVED: No multi-step macros are described explicitly in the source.
```

## Safety

```yaml
confirmation_required_for:
  - reboot
interlocks: []
# Note: /reboot requires a POST request with parameter yes=1. Source warns to close window after reboot.
```

## Notes

- All requests use HTTP GET except `/reboot`, which requires an HTTP POST with body parameter `yes=1`.
- Default port is **11000** for all BluOS players. The NAD CI580 (multi-zone) uses ports 11000/11010/11020/11030 for nodes 1-4.
- **Long polling:** Pass `timeout=<seconds>` and `etag=<value-from-previous-response>` to `/Status` or `/SyncStatus` to receive a response only when state changes or timeout expires. Recommended timeout for `/Status` is 100 seconds; for `/SyncStatus` is 180 seconds. Do not poll the same resource faster than once per second even with long polling.
- **Regular polling:** Restrict to at most one request every 30 seconds.
- Input selection for firmware v4.2.0+: use `/Play?inputTypeIndex=<type>-<index>` (e.g., `spdif-1`, `analog-1`, `arc-1`). For firmware v3.8.0–v4.2.0: use `/Play?inputIndex=<N>` where N excludes Bluetooth.
- Service discovery uses LSDP (Lenbrook Service Discovery Protocol) over UDP port 11430 or mDNS (`_musc._tcp`, `_musp._tcp`). The actual control port should be discovered via MDNS or LSDP rather than assumed.
- Group control: send commands to the primary player IP; secondary players proxy most requests internally.
- Volume range is constrained to the configured range (typically -80..0 dB); absolute values outside this range are clamped.
- The `tell_slaves` parameter on `/Volume` (0 or 1) controls whether volume changes propagate to all grouped players.
- `etag` is an opaque value in response root elements; treat as a change-detection token only.

<!-- UNRESOLVED: M17 V2 Series-specific input list (physical connectors and their inputTypeIndex strings) is not enumerated in the BluOS API document. Integrators must query /RadioBrowse?service=Capture or /Settings?id=capture to discover available inputs at runtime. -->
<!-- UNRESOLVED: Firmware version compatibility ranges (which BluOS firmware versions ship on NAD M17 V2) are not stated in source. -->
<!-- UNRESOLVED: Whether the NAD M17 V2 supports the Doorbell Chime endpoint or BluOS HUB inputs is not confirmed in this document. -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-06-03T07:25:59.702Z
last_checked_at: 2026-06-03T07:25:59.702Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T07:25:59.702Z
matched_actions: 33
action_count: 33
confidence: medium
summary: "Complete match (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source document is the BluOS Custom Integration API v1.7, which covers all BluOS-based NAD products. Device-specific input types and physical input count for the M17 V2 are not enumerated in this document."
- "BluOS uses long-polling rather than unsolicited push events. Clients detect"
- "No multi-step macros are described explicitly in the source."
- "M17 V2 Series-specific input list (physical connectors and their inputTypeIndex strings) is not enumerated in the BluOS API document. Integrators must query /RadioBrowse?service=Capture or /Settings?id=capture to discover available inputs at runtime."
- "Firmware version compatibility ranges (which BluOS firmware versions ship on NAD M17 V2) are not stated in source."
- "Whether the NAD M17 V2 supports the Doorbell Chime endpoint or BluOS HUB inputs is not confirmed in this document."
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
