---
spec_id: admin/bluos-b100s
schema_version: ai4av-public-spec-v1
revision: 1
title: "BluOS B100S Control Spec"
manufacturer: BluOS
model_family: B100S
aliases: []
compatible_with:
  manufacturers:
    - BluOS
  models:
    - B100S
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-04-29T12:48:10.270Z
last_checked_at: 2026-04-26T11:26:52.230Z
generated_at: 2026-04-26T11:26:52.230Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "B100S-specific hardware details (available inputs, display capabilities) not stated in API doc"
  - "firmware version compatibility for B100S not stated"
  - "the source describes long-polling for status changes but no unsolicited"
  - "no multi-step macro sequences described in source"
  - "no explicit safety warnings or interlock procedures stated in source"
  - "specific B100S input types not confirmed (analog, optical, HDMI ARC, etc.)"
  - "firmware version compatibility range not stated"
  - "error response codes and recovery behavior not documented"
  - "maximum concurrent connection limit not stated"
verification:
  verdict: verified
  checked_at: 2026-04-26T11:26:52.230Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions matched literal source commands; transport parameters verified; specification covers essential BluOS control methods. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# BluOS B100S Control Spec

## Summary
The BluOS B100S is a network audio player controlled via HTTP GET requests over TCP/IP. The BluOS Custom Integration API (v1.7) provides commands for playback control, volume management, play queue operations, content browsing, player grouping, preset loading, direct input selection, Bluetooth mode control, and doorbell chimes. All responses are UTF-8 encoded XML. Port 11000 is used for all BluOS players (discovered via mDNS/LSDP).

<!-- UNRESOLVED: B100S-specific hardware details (available inputs, display capabilities) not stated in API doc -->
<!-- UNRESOLVED: firmware version compatibility for B100S not stated -->

## Transport
```yaml
protocols:
  - http
addressing:
  port: 11000
  base_url: "http://{player_ip}:11000"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable     # /Status and /SyncStatus return player state
- levelable     # volume control with level, dB, and mute
- routable      # direct input selection and player grouping
```

## Actions
```yaml
- id: play
  label: Play
  kind: action
  params:
    - name: seek
      type: integer
      description: "Jump to position in seconds within current track"
    - name: url
      type: string
      description: "URL-encoded stream URL to play"

- id: pause
  label: Pause
  kind: action
  params:
    - name: toggle
      type: integer
      description: "Set to 1 to toggle current pause state"

- id: stop
  label: Stop
  kind: action
  params: []

- id: skip
  label: Skip
  kind: action
  params: []

- id: back
  label: Back
  kind: action
  params: []

- id: shuffle
  label: Set Shuffle
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = off, 1 = on"

- id: repeat
  label: Set Repeat
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = repeat queue, 1 = repeat track, 2 = repeat off"

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: "Absolute volume 0-100"
    - name: abs_db
      type: number
      description: "Absolute volume in dB"
    - name: db
      type: number
      description: "Relative volume change in dB (positive or negative)"
    - name: tell_slaves
      type: integer
      description: "Grouped players: 0 = this player only, 1 = all in group"

- id: mute_on
  label: Mute On
  kind: action
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  params: []

- id: clear_queue
  label: Clear Play Queue
  kind: action
  params: []

- id: delete_track
  label: Delete Track
  kind: action
  params:
    - name: id
      type: integer
      description: "Track position in queue"

- id: move_track
  label: Move Track
  kind: action
  params:
    - name: old
      type: integer
      description: "Current position"
    - name: new
      type: integer
      description: "Destination position"

- id: save_queue
  label: Save Queue
  kind: action
  params:
    - name: name
      type: string
      description: "Name for the saved playlist"

- id: load_preset
  label: Load Preset
  kind: action
  params:
    - name: id
      type: string
      description: "Preset ID number, +1 for next, -1 for previous"

- id: group_add_slave
  label: Group Player
  kind: action
  params:
    - name: slave
      type: string
      description: "Secondary player IP address (or comma-separated IPs)"
    - name: port
      type: integer
      description: "Secondary player port (or comma-separated ports)"
    - name: group
      type: string
      description: "Optional group name"

- id: remove_slave
  label: Ungroup Player
  kind: action
  params:
    - name: slave
      type: string
      description: "Secondary player IP (or comma-separated IPs)"
    - name: port
      type: integer
      description: "Secondary player port (or comma-separated ports)"

- id: reboot
  label: Reboot Player
  kind: action
  params: []

- id: doorbell_chime
  label: Doorbell Chime
  kind: action
  params:
    - name: play
      type: integer
      description: "Always 1 to play chime"

- id: select_input_url
  label: Select Input by URL
  kind: action
  params:
    - name: url
      type: string
      description: "URL from /RadioBrowse?service=Capture response"

- id: select_input_index
  label: Select Input by Index
  kind: action
  params:
    - name: inputIndex
      type: integer
      description: "1-based index of inputs (firmware v3.8.0-v4.2.0)"

- id: select_input_type_index
  label: Select Input by Type-Index
  kind: action
  params:
    - name: inputTypeIndex
      type: string
      description: "Format: type-index (e.g. spdif-1, analog-1, arc-1). Firmware v4.2.0+"

- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  params:
    - name: bluetoothAutoplay
      type: integer
      description: "0 = Manual, 1 = Automatic, 2 = Guest, 3 = Disabled"

- id: browse
  label: Browse Content
  kind: action
  params:
    - name: key
      type: string
      description: "Browse key from previous response (URL-encoded)"
    - name: q
      type: string
      description: "Search text for search queries"

- id: streaming_action
  label: Streaming Radio Action
  kind: action
  params:
    - name: service
      type: string
      description: "Service name from action URL"
    - name: action
      type: string
      description: "Action URL from /Status response <actions> element"
- id: radio_browse_capture
  label: Browse Capture Inputs
  kind: query
  params:
    - name: service
      type: string
      description: "Service to browse; use 'Capture' to list available active inputs"

- id: settings_capture
  label: Get Capture Input Settings
  kind: query
  params:
    - name: id
      type: string
      description: "Settings group id; use 'capture' to retrieve input configuration"
    - name: schemaVersion
      type: integer
      description: "Schema version for response format; use 32 for latest"
```

## Feedbacks
```yaml
- id: playback_status
  type: xml
  description: "/Status response - state, volume, mute, track info, shuffle, repeat, secs, totlen"

- id: sync_status
  type: xml
  description: "/SyncStatus response - player name, model, volume, mute, grouping info"

- id: volume_level
  type: xml
  description: "/Volume response - volume level 0-100, dB, mute state"

- id: playlist
  type: xml
  description: "/Playlist response - queue name, length, track list"

- id: presets_list
  type: xml
  description: "/Presets response - preset IDs, names, URLs"

- id: browse_result
  type: xml
  description: "/Browse response - navigation hierarchy with items, categories"
```

## Variables
```yaml
- id: volume
  type: integer
  min: 0
  max: 100
  unit: percent
  description: "Player volume level (-1 means fixed volume)"

- id: volume_db
  type: number
  unit: dB
  description: "Volume level in dB (typical range -80..0)"

- id: mute
  type: boolean
  description: "Mute state"

- id: shuffle
  type: boolean
  description: "Shuffle state"

- id: repeat
  type: enum
  values: [queue, track, off]
  description: "Repeat mode: 0=queue, 1=track, 2=off"

- id: bluetooth_mode
  type: enum
  values: [manual, automatic, guest, disabled]
  description: "Bluetooth autoplay mode"
```

## Events
```yaml
# UNRESOLVED: the source describes long-polling for status changes but no unsolicited
# push notification mechanism. Long-polling /Status or /SyncStatus with etag/timeout
# parameters returns when state changes. This is poll-based, not event-based.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - reboot
  - clear_queue
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures stated in source
```

## Notes
- All commands are HTTP GET requests except `/reboot` which is HTTP POST with parameter `yes=1`.
- Responses are UTF-8 encoded XML.
- Long polling is supported for `/Status` and `/SyncStatus` using `timeout` and `etag` parameters. Recommended polling interval is 100 seconds for `/Status` and 180 seconds for `/SyncStatus`.
- When not long-polling, restrict polling to at most one request every 30 seconds.
- Grouped players: secondary players proxy most requests to the primary player.
- Port 11000 is default; CI580 multi-zone uses ports 11000/11010/11020/11030. Actual port should be discovered via mDNS (`musc.tcp`, `musp.tcp`) or LSDP (UDP port 11430).
- Direct input selection has three methods depending on firmware version: URL-based (all), `inputIndex` (v3.8.0–v4.2.0), and `inputTypeIndex` (v4.2.0+).
- The LSDP discovery protocol uses UDP broadcast on port 11430 as a fallback when mDNS multicast is unreliable.

<!-- UNRESOLVED: specific B100S input types not confirmed (analog, optical, HDMI ARC, etc.) -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: error response codes and recovery behavior not documented -->
<!-- UNRESOLVED: maximum concurrent connection limit not stated -->

## Provenance

```yaml
source_domains:
  - bluos.io
source_urls:
  - https://bluos.io/wp-content/uploads/2025/06/BluOS-Custom-Integration-API_v1.7.pdf
retrieved_at: 2026-04-29T12:48:10.270Z
last_checked_at: 2026-04-26T11:26:52.230Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T11:26:52.230Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions matched literal source commands; transport parameters verified; specification covers essential BluOS control methods. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "B100S-specific hardware details (available inputs, display capabilities) not stated in API doc"
- "firmware version compatibility for B100S not stated"
- "the source describes long-polling for status changes but no unsolicited"
- "no multi-step macro sequences described in source"
- "no explicit safety warnings or interlock procedures stated in source"
- "specific B100S input types not confirmed (analog, optical, HDMI ARC, etc.)"
- "firmware version compatibility range not stated"
- "error response codes and recovery behavior not documented"
- "maximum concurrent connection limit not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
