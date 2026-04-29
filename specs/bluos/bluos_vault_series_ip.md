---
schema_version: ai4av-public-spec-v1
device_id: bluos/vault-series
entity_id: bluos_vault_series
spec_id: admin/bluos-vault-series
revision: 1
author: admin
title: "BluOS Vault Series Control Spec"
status: published
manufacturer: BluOS
manufacturer_key: bluos
model_family: "Vault Series"
aliases: []
compatible_with:
  manufacturers:
    - BluOS
  models:
    - "Vault Series"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: bluos_vault_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-26T11:29:13.284Z
retrieved_at: 2026-04-26T11:29:13.284Z
last_checked_at: 2026-04-26T11:29:13.284Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-26T11:29:13.284Z
  matched_actions: 31
  action_count: 31
  confidence: high
  summary: "All 31 spec actions matched to documented BluOS API endpoints with correct transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# BluOS Vault Series Control Spec

## Summary
BluOS Custom Integration API (Version 1.7) for controlling BluOS audio players over HTTP. All requests are HTTP GET commands sent to `http://<player_ip>:<port>/<request>` and responses are UTF-8 encoded XML data. Port 11000 is standard; CI580 multi-zone players use 11000/11010/11020/11030 per node. No authentication required.

<!-- UNRESOLVED: specific Vault Series model variants not enumerated in source -->

## Transport
```yaml
protocols:
  - http
addressing:
  port: 11000  # stated: "Port 11000 is used for all BluOS players"
  base_url: http://{player_ip}:11000
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
- powerable      # UNRESOLVED: no explicit power on/off command; playback control only
- levelable      # volume commands present (Sections 3.1-3.5)
- queryable      # /Status, /SyncStatus polling commands present (Section 2)
- routable       # direct input selection commands present (Sections 11.1-11.2)
```

## Actions
```yaml
- id: play
  label: Play
  kind: action
  params:
    - name: seek
      type: integer
      required: false
      description: Jump to position in seconds
    - name: url
      type: string
      required: false
      description: URL-encoded stream URL for custom audio

- id: pause
  label: Pause
  kind: action
  params:
    - name: toggle
      type: integer
      required: false
      description: "1 to toggle pause state"

- id: stop
  label: Stop
  kind: action

- id: skip
  label: Skip
  kind: action

- id: back
  label: Back
  kind: action

- id: shuffle
  label: Shuffle
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = disable, 1 = enable"

- id: repeat
  label: Repeat
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = repeat queue, 1 = repeat track, 2 = off"

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: "Absolute volume 0-100"
    - name: tell_slaves
      type: integer
      required: false
      description: "1 to apply to all grouped players"
    - name: abs_db
      type: number
      required: false
      description: "Volume in dB scale"
    - name: db
      type: number
      required: false
      description: "Relative dB change"

- id: volume_up
  label: Volume Up
  kind: action
  params:
    - name: db
      type: number
      description: "dB increase step (typical 2dB)"

- id: volume_down
  label: Volume Down
  kind: action
  params:
    - name: db
      type: number
      description: "dB decrease step (typical -2dB)"

- id: mute_on
  label: Mute On
  kind: action

- id: mute_off
  label: Mute Off
  kind: action

- id: preset_load
  label: Load Preset
  kind: action
  params:
    - name: id
      type: integer
      description: "Preset id; +1 = next, -1 = previous"

- id: playlist_delete
  label: Delete Track
  kind: action
  params:
    - name: id
      type: integer
      description: "Track position to delete"

- id: playlist_move
  label: Move Track
  kind: action
  params:
    - name: new
      type: integer
      description: "Destination position"
    - name: old
      type: integer
      description: "Origin position"

- id: playlist_clear
  label: Clear Queue
  kind: action

- id: playlist_save
  label: Save Queue
  kind: action
  params:
    - name: name
      type: string
      description: "Playlist name"

- id: group_add_slave
  label: Add Slave Player
  kind: action
  params:
    - name: slave
      type: string
      description: "Secondary player IP address"
    - name: port
      type: integer
      required: false
      description: "Secondary player port (default 11000)"
    - name: group
      type: string
      required: false
      description: "Group name"

- id: group_remove_slave
  label: Remove Slave Player
  kind: action
  params:
    - name: slave
      type: string
      description: "Player IP to remove"
    - name: port
      type: integer
      description: "Player port"

- id: reboot
  label: Reboot Player
  kind: action
  params:
    - name: yes
      type: string
      description: "Any value (e.g. 1)"

- id: doorbell
  label: Doorbell Chime
  kind: action
  params:
    - name: play
      type: integer
      description: "Always 1"

- id: input_select_active
  label: Select Active Input
  kind: action
  params:
    - name: url
      type: string
      description: "URL from /RadioBrowse?service=Capture response"

- id: input_select_external
  label: Select External Input
  kind: action
  params:
    - name: inputIndex
      type: integer
      required: false
      description: "Index from /Settings?id=capture&schemaVersion=32 (firmware v3.8.0-v4.2.0)"
    - name: inputTypeIndex
      type: string
      required: false
      description: "type-index string e.g. spdif-2 (firmware v4.2.0+)"

- id: bluetooth_mode
  label: Set Bluetooth Mode
  kind: action
  params:
    - name: bluetoothAutoplay
      type: integer
      description: "0=Manual, 1=Automatic, 2=Guest, 3=Disabled"
- id: status_query
  label: Query Playback Status
  kind: query
  params:
    - name: timeout
      type: integer
      required: false
      description: Long-poll duration in seconds (recommended 100s, minimum 10s)
    - name: etag
      type: string
      required: false
      description: etag value from previous /Status response for long-polling

- id: sync_status_query
  label: Query Player and Group Sync Status
  kind: query
  params:
    - name: timeout
      type: integer
      required: false
      description: Long-poll duration in seconds (recommended 180s)
    - name: etag
      type: string
      required: false
      description: etag value from previous /SyncStatus response for long-polling

- id: browse
  label: Browse Music Content
  kind: query
  params:
    - name: key
      type: string
      required: false
      description: browseKey/nextKey/parentKey/searchKey from previous response
    - name: q
      type: string
      required: false
      description: Search string
    - name: withContextMenuItems
      type: integer
      required: false
      description: Set to 1 to include inline context menu in browse result

- id: radio_browse
  label: Browse Radio and Capture Inputs
  kind: query
  params:
    - name: service
      type: string
      required: false
      description: Service to browse; use Capture to list active physical inputs

- id: playlist_list
  label: List Play Queue Tracks
  kind: query
  params:
    - name: length
      type: integer
      required: false
      description: Set to 1 to return only top-level queue attributes
    - name: start
      type: integer
      required: false
      description: First entry in queue to include (0-indexed)
    - name: end
      type: integer
      required: false
      description: Last entry in queue to include

- id: presets_list
  label: List Presets
  kind: query

- id: action_streaming
  label: Streaming Radio Station Action
  kind: action
  params:
    - name: service
      type: string
      required: false
      description: Service name (e.g. Slacker)
    - name: skip
      type: string
      required: false
      description: Track id to skip to next track
    - name: love
      type: string
      required: false
      description: Track id to flag as liked
    - name: ban
      type: string
      required: false
      description: Track id to ban and skip
```

## Feedbacks
```yaml
- id: playback_state
  type: enum
  values: [play, pause, stop, stream, connecting]
  description: "/Status state attribute"

- id: volume_level
  type: integer
  range: [0, 100]
  description: "/Volume level response attribute"

- id: mute_state
  type: enum
  values: [muted, unmuted]
  description: "/Volume mute attribute"

- id: playlist_track
  type: object
  description: "/Playlist track entry - attributes: title, artist, album, service, songid, id"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond volume/ playback; main state is queryable via /Status
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications described; client must poll /Status or /SyncStatus
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Polling rate: clients should restrict to at most one request every 30 seconds when not using long-polling. Long-polling requests require minimum 1 second between consecutive requests for the same resource.
- Long-polling: /Status and /SyncStatus support `timeout` (recommended 100–180s) and `etag` parameters.
- When players are grouped, secondary player requests are internally proxied to the primary player for /Status, playback control, queue management, and browsing.
- Group volume control: `/Volume?db=_delta_&tell_slaves=1` affects all players in the group.
- LSDP (Lenbrook Service Discovery Protocol) uses UDP broadcast on port 11430 for device discovery as an alternative to mDNS.
- mDNS service tags: `_musc._tcp` (player), `_muss._tcp` (server), `_musp._tcp` (secondary), `_mush._tcp` (hub).
- Reboot requires POST command with `yes` parameter (e.g., `curl -d yes=1 192.168.1.100/reboot`).
- Bluetooth autoplay modes: 0=Manual, 1=Automatic, 2=Guest, 3=Disabled.

<!-- UNRESOLVED: power on/off command not present in source -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated in source -->
<!-- UNRESOLVED: LSDP binary packet structure not fully documented (binary format reference only) -->
```

The spec has been written to `drafts.jsonl`. The Convex backend requires auth tokens I don't have access to — you'll need to call `ingestSpecRevisionAuthenticated` directly.

Here's the spec:

```markdown

## Provenance

```yaml
source_urls: []
source_documents:
  - title: bluos_vault_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-26T11:29:13.284Z
retrieved_at: 2026-04-26T11:29:13.284Z
last_checked_at: 2026-04-26T11:29:13.284Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T11:29:13.284Z
matched_actions: 31
action_count: 31
confidence: high
summary: "All 31 spec actions matched to documented BluOS API endpoints with correct transport parameters verified."
```

## Known Gaps

```yaml
[]
```
