---
spec_id: admin/nad-av-receiver
schema_version: ai4av-public-spec-v1
revision: 1
title: "NAD AV Receiver Control Spec"
manufacturer: NAD
model_family: "NAD AV Receiver"
aliases: []
compatible_with:
  manufacturers:
    - NAD
  models:
    - "NAD AV Receiver"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-10-01T07:05:26.642Z
last_checked_at: 2026-10-01T07:05:26.642Z
generated_at: 2026-10-01T07:05:26.642Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - /RadioBrowse
  - /Settings
  - /Sources
  - /Artwork
  - "specific NAD AV receiver model numbers not listed in this document — it covers all BluOS-based NAD players generically"
  - "firmware version compatibility ranges not stated"
  - "no multi-step sequences explicitly described in source"
  - "no safety warnings or interlock procedures found in source"
  - "specific NAD model numbers covered by this API are not listed"
  - "maximum number of grouped players not stated"
  - "error response codes and handling not fully documented"
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-10-01T07:05:26.642Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions map to documented BluOS endpoints; transport port 11000 and HTTP GET framing verified in source. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# NAD AV Receiver Control Spec

## Summary
NAD AV receivers using the BluOS Custom Integration API v1.7, controllable via HTTP GET requests over TCP/IP. The API provides playback control, volume management, input selection, player grouping, content browsing, preset management, and more. Responses are UTF-8 encoded XML.

<!-- UNRESOLVED: specific NAD AV receiver model numbers not listed in this document — it covers all BluOS-based NAD players generically -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://{player_ip}:11000/{request}"
  port: 11000
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable     # inferred: soft reboot command present
- levelable     # inferred: volume control commands present
- queryable     # inferred: /Status and /SyncStatus query commands present
- routable      # inferred: input selection commands present
```

## Actions
```yaml
- id: play
  label: Play
  kind: action
  params:
    - name: seek
      type: integer
      description: "Jump to position in seconds into current track"
    - name: id
      type: integer
      description: "Track id in queue to play (0-based index)"
    - name: url
      type: string
      description: "URL-encoded stream URL to play"

- id: pause
  label: Pause
  kind: action
  params:
    - name: toggle
      type: integer
      description: "If 1, toggle current pause state"

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

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: "Absolute volume level 0-100"
    - name: abs_db
      type: number
      description: "Set volume using absolute dB scale"
    - name: db
      type: number
      description: "Relative volume change in dB (positive or negative)"
    - name: tell_slaves
      type: integer
      description: "Grouped players: 0=only this player, 1=all in group"

- id: mute_on
  label: Mute On
  kind: action
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  params: []

- id: shuffle
  label: Set Shuffle
  kind: action
  params:
    - name: state
      type: integer
      description: "0=off, 1=on"

- id: repeat
  label: Set Repeat
  kind: action
  params:
    - name: state
      type: integer
      description: "0=repeat queue, 1=repeat track, 2=repeat off"

- id: clear_queue
  label: Clear Queue
  kind: action
  params: []

- id: delete_track
  label: Delete Track
  kind: action
  params:
    - name: id
      type: integer
      description: "Track position in queue to delete"

- id: move_track
  label: Move Track
  kind: action
  params:
    - name: old
      type: integer
      description: "Current position of track"
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
      description: "Preset id number, +1 for next, or -1 for previous"

- id: select_input
  label: Select Input (Active)
  kind: action
  params:
    - name: url
      type: string
      description: "URL from /RadioBrowse?service=Capture response"

- id: select_input_index
  label: Select Input (Index)
  kind: action
  params:
    - name: inputIndex
      type: integer
      description: "1-based input index from /Settings?id=capture (firmware < v4.2.0)"

- id: select_input_type_index
  label: Select Input (Type-Index)
  kind: action
  params:
    - name: inputTypeIndex
      type: string
      description: "Format: type-index (e.g. spdif-1, analog-1, arc-1). Firmware >= v4.2.0"

- id: group_add_slave
  label: Group Add Player
  kind: action
  params:
    - name: slave
      type: string
      description: "IP address of secondary player"
    - name: port
      type: integer
      description: "Port of secondary player"
    - name: group
      type: string
      description: "Optional group name"

- id: group_add_slaves
  label: Group Add Multiple Players
  kind: action
  params:
    - name: slaves
      type: string
      description: "Comma-separated IP addresses"
    - name: ports
      type: string
      description: "Comma-separated port numbers"

- id: group_remove_slave
  label: Group Remove Player
  kind: action
  params:
    - name: slave
      type: string
      description: "IP address of player to remove"
    - name: port
      type: integer
      description: "Port of player to remove"

- id: group_remove_slaves
  label: Group Remove Multiple Players
  kind: action
  params:
    - name: slaves
      type: string
      description: "Comma-separated IP addresses"
    - name: ports
      type: string
      description: "Comma-separated port numbers"

- id: action_skip_radio
  label: Radio Skip
  kind: action
  params:
    - name: service
      type: string
      description: "Service name (e.g. Slacker)"
    - name: skip
      type: string
      description: "Skip action value from /Status response"

- id: action_love_radio
  label: Radio Love Track
  kind: action
  params:
    - name: service
      type: string
      description: "Service name"
    - name: love
      type: string
      description: "Love action value from /Status response"

- id: action_ban_radio
  label: Radio Ban Track
  kind: action
  params:
    - name: service
      type: string
      description: "Service name"
    - name: ban
      type: string
      description: "Ban action value from /Status response"

- id: reboot
  label: Soft Reboot
  kind: action
  params:
    - name: yes
      type: string
      description: "Any value (e.g. 1). Sent as POST."

- id: doorbell
  label: Doorbell Chime
  kind: action
  params:
    - name: play
      type: integer
      description: "Always 1"

- id: set_bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  params:
    - name: bluetoothAutoplay
      type: integer
      description: "0=Manual, 1=Automatic, 2=Guest, 3=Disabled"
```

## Feedbacks
```yaml
- id: playback_status
  type: xml
  description: "/Status response with state, volume, track info, shuffle, repeat, mute, etag"

- id: sync_status
  type: xml
  description: "/SyncStatus response with player info, grouping, volume, mute, etag"

- id: volume_level
  type: integer
  description: "Current volume 0-100 (or -1 for fixed). From /Volume response."

- id: volume_db
  type: number
  description: "Current volume in dB. From /Volume response."

- id: mute_state
  type: enum
  values: ["0", "1"]
  description: "0=unmuted, 1=muted. From /Volume or /Status response."

- id: playback_state
  type: enum
  values: [play, pause, stop, stream, connecting]

- id: play_queue
  type: xml
  description: "/Playlist response with queue name, length, track list"

- id: presets_list
  type: xml
  description: "/Presets response with preset id, name, url, image"

- id: browse_result
  type: xml
  description: "/Browse response with hierarchical content items"
```

## Variables
```yaml
- id: volume
  type: integer
  min: 0
  max: 100
  description: "Player volume level in percent"

- id: shuffle_state
  type: enum
  values: ["0", "1"]
  description: "0=off, 1=on"

- id: repeat_state
  type: enum
  values: ["0", "1", "2"]
  description: "0=repeat queue, 1=repeat track, 2=off"

- id: bluetooth_mode
  type: enum
  values: ["0", "1", "2", "3"]
  description: "0=Manual, 1=Automatic, 2=Guest, 3=Disabled"
```

## Events
```yaml
# The API uses long polling (not push events). /Status and /SyncStatus support
# long-polling with timeout and etag parameters. No unsolicited notifications.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
- All commands are HTTP GET requests except `/reboot` which is a POST.
- Responses are UTF-8 encoded XML.
- Default port is 11000 for all BluOS players. The NAD CI580 uses ports 11000, 11010, 11020, 11030 for its four streamer nodes.
- Port should be discovered via mDNS (services `musc.tcp` and `musp.tcp`) or LSDP (UDP broadcast on port 11430).
- Long polling is supported for `/Status` (recommended 100s timeout) and `/SyncStatus` (recommended 180s timeout). Without long polling, clients should poll at most once every 30 seconds.
- The `/Status` etag is an opaque value; if unchanged the response is guaranteed unchanged.
- The `secs` field in `/Status` is not included in the etag calculation; clients must track playback position locally.
- Input selection has three methods depending on firmware version: `/Play?url=` (active inputs), `/Play?inputIndex=` (firmware < v4.2.0), `/Play?inputTypeIndex=` (firmware >= v4.2.0).
- The LSDP discovery protocol uses UDP broadcast on port 11430 as an alternative to mDNS.
- The CI580 multi-zone player has four streamer nodes on one IP address, each using a different port.
- For grouped players, secondary players proxy most requests to the primary player internally.

<!-- UNRESOLVED: specific NAD model numbers covered by this API are not listed -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated -->
<!-- UNRESOLVED: maximum number of grouped players not stated -->
<!-- UNRESOLVED: error response codes and handling not fully documented -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-10-01T07:05:26.642Z
last_checked_at: 2026-10-01T07:05:26.642Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T07:05:26.642Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions map to documented BluOS endpoints; transport port 11000 and HTTP GET framing verified in source. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- /RadioBrowse
- /Settings
- /Sources
- /Artwork
- "specific NAD AV receiver model numbers not listed in this document — it covers all BluOS-based NAD players generically"
- "firmware version compatibility ranges not stated"
- "no multi-step sequences explicitly described in source"
- "no safety warnings or interlock procedures found in source"
- "specific NAD model numbers covered by this API are not listed"
- "maximum number of grouped players not stated"
- "error response codes and handling not fully documented"
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
