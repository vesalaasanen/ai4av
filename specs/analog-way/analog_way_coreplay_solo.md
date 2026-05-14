---
spec_id: admin/analog-way-coreplay-solo
schema_version: ai4av-public-spec-v1
revision: 1
title: "Analog Way CorePlay Solo Control Spec"
manufacturer: "Analog Way"
model_family: "CorePlay Solo"
aliases: []
compatible_with:
  manufacturers:
    - "Analog Way"
  models:
    - "CorePlay Solo"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - s3.eu-west-3.amazonaws.com
source_urls:
  - https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/CorePlay/Common/API/CoreAPI+1.1.3+HTML/coreapi.html
retrieved_at: 2026-05-08T15:20:40.281Z
last_checked_at: 2026-05-14T18:17:13.952Z
generated_at: 2026-05-14T18:17:13.952Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:13.952Z
  matched_actions: 33
  action_count: 33
  confidence: high
  summary: "All 34 spec actions mapped cleanly to documented REST endpoints with correct methods, paths, and parameters."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-07
---

# Analog Way CorePlay Solo Control Spec

## Summary
Analog Way CorePlay Solo is a media playback server with a RESTful HTTP API (v1) at `/api/core/v1/`. It provides preview/program player engine control, media library management, playlist navigation, show import/export, storage management, and real-time SSE event streaming. Rate limit: 10 requests/second.

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: http://{host}/api/core/v1
  port: null  # UNRESOLVED: port number not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred: reboot and shutdown commands present
- queryable    # inferred: GET endpoints returning device/player state
- levelable    # inferred: volume control present
```

## Actions
```yaml
- id: get_api_version
  label: Get API Version
  kind: query
  method: GET
  path: /version
  params: []

- id: get_system_info
  label: Get System Information
  kind: query
  method: GET
  path: /system
  params: []

- id: reboot
  label: Reboot Device
  kind: action
  method: POST
  path: /system/reboot
  params: []

- id: shutdown
  label: Shutdown Device
  kind: action
  method: POST
  path: /system/shutdown
  params: []

- id: get_all_players
  label: Get All Player Engines State
  kind: query
  method: GET
  path: /players
  params: []

- id: get_player
  label: Get Player Engine State
  kind: query
  method: GET
  path: /players/{playerIndex}
  params:
    - name: playerIndex
      type: integer
      description: Player index starting from 1

- id: take
  label: Take Preview to Program
  kind: action
  method: POST
  path: /players/{playerIndex}/take
  params:
    - name: playerIndex
      type: integer
      description: Player index starting from 1
    - name: mode
      type: string
      description: "Preview state after take: swap or copy"
      values: [swap, copy]
    - name: startPoint
      type: string
      description: "Start from inpoint or current position"
      values: [inpoint, position]
    - name: transitionType
      type: string
      description: "Transition type between media"
      values: [crossfade, dipToColor, directCut]
    - name: transitionDuration
      type: number
      description: "Transition duration in seconds (min 0)"

- id: get_take_configuration
  label: Get Default Take Configuration
  kind: query
  method: GET
  path: /players/{playerIndex}/takeConfiguration
  params:
    - name: playerIndex
      type: integer
      description: Player index starting from 1

- id: set_take_configuration
  label: Set Default Take Configuration
  kind: action
  method: POST
  path: /players/{playerIndex}/takeConfiguration
  params:
    - name: playerIndex
      type: integer
      description: Player index starting from 1
    - name: mode
      type: string
      description: "Preview state after take"
      values: [swap, copy]
    - name: startPoint
      type: string
      description: "Start point after take"
      values: [inpoint, position]
    - name: transitionType
      type: string
      description: "Transition type"
      values: [crossfade, dipToColor, directCut]
    - name: transitionDuration
      type: number
      description: "Transition duration in seconds (min 0)"

- id: get_feed
  label: Get Player Feed State
  kind: query
  method: GET
  path: /players/{playerIndex}/{feedName}
  params:
    - name: playerIndex
      type: integer
      description: Player index starting from 1
    - name: feedName
      type: string
      description: "Feed name: program or preview"
      values: [program, preview]

- id: assign_media
  label: Assign Media to Feed
  kind: action
  method: POST
  path: /players/{playerIndex}/{feedName}/media
  params:
    - name: playerIndex
      type: integer
      description: Player index starting from 1
    - name: feedName
      type: string
      description: "Feed name: program or preview"
      values: [program, preview]
    - name: mediaUrl
      type: string
      description: "URL of media library item (e.g. core://collections/1/slots/2)"

- id: stop_playback
  label: Stop Playback
  kind: action
  method: POST
  path: /players/{playerIndex}/{feedName}/stop
  params:
    - name: playerIndex
      type: integer
      description: Player index starting from 1
    - name: feedName
      type: string
      description: "Feed name: program or preview"
      values: [program, preview]

- id: play
  label: Play / Resume
  kind: action
  method: POST
  path: /players/{playerIndex}/{feedName}/play
  params:
    - name: playerIndex
      type: integer
      description: Player index starting from 1
    - name: feedName
      type: string
      description: "Feed name: program or preview"
      values: [program, preview]

- id: pause
  label: Pause Playback
  kind: action
  method: POST
  path: /players/{playerIndex}/{feedName}/pause
  params:
    - name: playerIndex
      type: integer
      description: Player index starting from 1
    - name: feedName
      type: string
      description: "Feed name: program or preview"
      values: [program, preview]

- id: previous
  label: Previous Playlist Item
  kind: action
  method: POST
  path: /players/{playerIndex}/{feedName}/previous
  params:
    - name: playerIndex
      type: integer
      description: Player index starting from 1
    - name: feedName
      type: string
      description: "Feed name: program or preview"
      values: [program, preview]

- id: next
  label: Next Playlist Item
  kind: action
  method: POST
  path: /players/{playerIndex}/{feedName}/next
  params:
    - name: playerIndex
      type: integer
      description: Player index starting from 1
    - name: feedName
      type: string
      description: "Feed name: program or preview"
      values: [program, preview]

- id: seek
  label: Seek in Current Media
  kind: action
  method: POST
  path: /players/{playerIndex}/{feedName}/seek
  params:
    - name: playerIndex
      type: integer
      description: Player index starting from 1
    - name: feedName
      type: string
      description: "Feed name: program or preview"
      values: [program, preview]
    - name: position
      type: number
      description: "Seek position in seconds from inpoint (mutually exclusive with mediaPosition, normalizedPosition)"
    - name: mediaPosition
      type: number
      description: "Seek position in seconds from start of media (mutually exclusive)"
    - name: normalizedPosition
      type: number
      description: "Normalized seek position 0.0-1.0 between inpoint and outpoint (mutually exclusive)"

- id: set_volume
  label: Set Playback Volume
  kind: action
  method: POST
  path: /players/{playerIndex}/{feedName}/setVolume
  params:
    - name: playerIndex
      type: integer
      description: Player index starting from 1
    - name: feedName
      type: string
      description: "Feed name: program or preview"
      values: [program, preview]
    - name: volume
      type: number
      description: "New volume in decibels"

- id: mute
  label: Mute Playback
  kind: action
  method: POST
  path: /players/{playerIndex}/{feedName}/mute
  params:
    - name: playerIndex
      type: integer
      description: Player index starting from 1
    - name: feedName
      type: string
      description: "Feed name: program or preview"
      values: [program, preview]

- id: unmute
  label: Unmute Playback
  kind: action
  method: POST
  path: /players/{playerIndex}/{feedName}/unmute
  params:
    - name: playerIndex
      type: integer
      description: Player index starting from 1
    - name: feedName
      type: string
      description: "Feed name: program or preview"
      values: [program, preview]

- id: export_show
  label: Export Showfile
  kind: query
  method: GET
  path: /show/current
  params: []

- id: delete_show
  label: Delete Current Show
  kind: action
  method: DELETE
  path: /show/current
  params: []

- id: import_show
  label: Import Showfile
  kind: action
  method: POST
  path: /show/current
  params:
    - name: include
      type: string
      description: "Properties to import"
      values: [video, audio, playback, medialibrary]
    - name: force
      type: boolean
      description: "Force import regardless of showfile version"

- id: get_metadata
  label: Get Media Metadata
  kind: query
  method: GET
  path: /metadata
  params:
    - name: contentUrl
      type: string
      description: "URL of the file (must start with file:///)"

- id: get_collections
  label: Get All Collections
  kind: query
  method: GET
  path: /collections
  params: []

- id: get_playlists
  label: Get All Playlists
  kind: query
  method: GET
  path: /playlists
  params: []

- id: get_jobs
  label: List Jobs
  kind: query
  method: GET
  path: /jobs
  params: []

- id: get_job
  label: Get Job
  kind: query
  method: GET
  path: /jobs/{jobId}
  params:
    - name: jobId
      type: string
      description: Job ID

- id: cancel_job
  label: Cancel Job
  kind: action
  method: POST
  path: /jobs/{jobId}/cancel
  params:
    - name: jobId
      type: string
      description: Job ID

- id: get_storages
  label: List Storages
  kind: query
  method: GET
  path: /storages
  params: []

- id: get_storage
  label: Get Storage Info
  kind: query
  method: GET
  path: /storages/{uuid}
  params:
    - name: uuid
      type: string
      description: Storage UUID

- id: ingest_storage
  label: Ingest USB Storage
  kind: action
  method: POST
  path: /storages/{uuid}/ingest
  params:
    - name: uuid
      type: string
      description: Storage UUID
    - name: destinationDirectory
      type: string
      description: "Destination directory on server storage"
    - name: overwrite
      type: string
      description: "Overwrite behavior"
      values: [skip, overwrite, overwriteOld, cancel]
    - name: preview
      type: boolean
      description: "Preview-only mode (no actual ingestion)"
    - name: filter
      type: string
      description: "Include filters for ingestion (glob patterns)"

- id: eject_storage
  label: Eject USB Storage
  kind: action
  method: POST
  path: /storages/{uuid}/eject
  params:
    - name: uuid
      type: string
      description: Storage UUID
```

## Feedbacks
```yaml
- id: api_version
  type: object
  description: "API version (major, minor, patch, tag, isPublicRelease)"

- id: system_info
  type: object
  description: "Device info (name, hostname, productType, serialNumber, firmwareVersion, uptime)"

- id: player_state
  type: object
  description: "Player engine state (takeProgress, preview, program, takeConfiguration)"

- id: feed_state
  type: object
  description: "Feed state (mediaUrl, state, position, normalizedPosition, mediaPosition, volume, isMuted, isResourceConstrained)"

- id: feed_playback_state
  type: enum
  values: [playing, paused, stopped]

- id: job_status
  type: object
  description: "Job info (type, result, error, progress, timeElapsed, timeTotal)"

- id: job_result
  type: enum
  values: [inProgress, completed, failed]
```

## Variables
```yaml
- id: feed_volume
  type: number
  unit: dB
  description: "Playback volume for a player feed"

- id: take_mode
  type: enum
  values: [swap, copy]
  description: "Take mode - swap or copy preview to program"

- id: take_start_point
  type: enum
  values: [inpoint, position]
  description: "Start point after take"

- id: transition_type
  type: enum
  values: [crossfade, dipToColor, directCut]
  description: "Transition type between consecutive media"

- id: transition_duration
  type: number
  unit: seconds
  description: "Transition duration in seconds"
```

## Events
```yaml
- id: sse_stream
  description: "SSE stream pushing JSON Patch (RFC 6902) messages for real-time state changes"
  topics: [players, system, collections, playlists, storages, jobs]
  format: "JSON Patch array"
  path: /sse
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source mentions reboot/shutdown with no confirmation requirement stated
```

## Notes
- API base path: `/api/core/v1/` — version 1 only documented.
- Rate limit: max 10 requests/second.
- All player endpoints use 1-based `playerIndex`.
- Feed names: `program` or `preview`.
- Media URLs use `core://` scheme (e.g. `core://collections/{id}/slots/{slot}`).
- Seek supports three mutually exclusive position modes: `position`, `mediaPosition`, `normalizedPosition`.
- SSE stream uses JSON Patch (RFC 6902) format for real-time updates; supports topic filtering.
- `DELETE /show/current` immediately stops playback and resets to defaults but does not delete media files.
- Import show supports selective import via `include` param (`video`, `audio`, `playback`, `medialibrary`).
<!-- UNRESOLVED: port number not stated in source -->
<!-- UNRESOLVED: number of player engines not stated (playerIndex is 1-based but max count unknown) -->
<!-- UNRESOLVED: volume range not stated (source says "decibels" but min/max unknown) -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - s3.eu-west-3.amazonaws.com
source_urls:
  - https://s3.eu-west-3.amazonaws.com/aw.store01/Site+Internet/Series/CorePlay/Common/API/CoreAPI+1.1.3+HTML/coreapi.html
retrieved_at: 2026-05-08T15:20:40.281Z
last_checked_at: 2026-05-14T18:17:13.952Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:13.952Z
matched_actions: 33
action_count: 33
confidence: high
summary: "All 34 spec actions mapped cleanly to documented REST endpoints with correct methods, paths, and parameters."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
