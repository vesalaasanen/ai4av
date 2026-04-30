---
schema_version: ai4av-public-spec-v1
device_id: bytehive/playoutbee
entity_id: bytehive_playoutbee
spec_id: admin/bytehive-playoutbee
revision: 1
author: admin
title: "ByteHive PlayoutBee Control Spec"
status: published
manufacturer: ByteHive
manufacturer_key: bytehive
model_family: PlayoutBee
aliases: []
compatible_with:
  manufacturers:
    - ByteHive
  models:
    - PlayoutBee
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: bytehive_playoutbee_companion.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T15:28:33.637Z
retrieved_at: 2026-04-23T15:28:33.637Z
last_checked_at: 2026-04-23T15:28:33.637Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T15:28:33.637Z
  matched_actions: 34
  action_count: 34
  confidence: high
  summary: "All 34 spec actions matched literals in source with correct shapes and transport parameters; complete bidirectional coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# ByteHive PlayoutBee Control Spec

## Summary
PlayoutBee is a media playout server controlled via REST API over HTTP on port 3000. Supports play/pause/stop, clip selection, asset management, volume control, and output window management across Raspberry Pi, Windows, and macOS platforms.

<!-- UNRESOLVED: security model not described in source -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: http://playoutbee:3000
  port: 3000
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable   # shutdown command present
- routable    # select/next/prev clip navigation present
- queryable   # player state, settings, currentTime, assets queries present
- levelable   # volume control present
```

## Actions
```yaml
- id: play
  label: Play
  kind: action
  params: []

- id: pause
  label: Pause
  kind: action
  params: []

- id: stop
  label: Stop
  kind: action
  params: []

- id: next_clip
  label: Next Clip
  kind: action
  params: []

- id: prev_asset
  label: Previous Asset
  kind: action
  params: []

- id: select_clip
  label: Select Clip
  kind: action
  params:
    - name: index
      type: integer
      description: 0-based index of the clip to select

- id: goto_timestamp
  label: Goto Timestamp
  kind: action
  params:
    - name: ms
      type: string
      description: Timestamp in ms, or leading +/- for incremental changes

- id: goto_last_seconds
  label: Goto Last X Seconds
  kind: action
  params:
    - name: ms
      type: float
      description: Seconds to go before end of asset

- id: upload_asset
  label: Upload Asset
  kind: action
  params:
    - name: files
      type: object
      description: Array of files to upload to playlist

- id: select_asset
  label: Select Asset
  kind: action
  params:
    - name: index
      type: string
      description: Asset index or "next", "prev", "current"

- id: enable_asset
  label: Enable Asset
  kind: action
  params:
    - name: index
      type: string
      description: Asset index or "next", "prev", "current"

- id: disable_asset
  label: Disable Asset
  kind: action
  params:
    - name: index
      type: string
      description: Asset index or "next", "prev", "current"

- id: set_asset_volume
  label: Set Asset Volume
  kind: action
  params:
    - name: index
      type: string
      description: Asset index or "next", "prev", "current"
    - name: volume
      type: float
      description: Volume 0.0-1.0, or +/- for incremental

- id: set_asset_action
  label: Set Asset Action
  kind: action
  params:
    - name: index
      type: string
      description: Asset index or "next", "prev", "current"
    - name: action
      type: integer
      description: "0=Pause, 1=PlayNext, 2=Next, 3=Loop, 4=Reset"

- id: set_asset_rotation
  label: Set Asset Rotation
  kind: action
  params:
    - name: index
      type: string
      description: Asset index or "next", "prev", "current"
    - name: rotation
      type: integer
      description: "Rotation angle: 0, 90, 180, or 270"

- id: set_in_point
  label: Set In Point
  kind: action
  params:
    - name: index
      type: string
      description: Asset index or "next", "prev", "current"

- id: set_out_point
  label: Set Out Point
  kind: action
  params:
    - name: index
      type: string
      description: Asset index or "next", "prev", "current"

- id: reset_in_point
  label: Reset In Point
  kind: action
  params:
    - name: index
      type: string
      description: Asset index or "next", "prev", "current"

- id: reset_out_point
  label: Reset Out Point
  kind: action
  params:
    - name: index
      type: string
      description: Asset index or "next", "prev", "current"

- id: shutdown
  label: Shutdown (Raspberry Pi)
  kind: action
  params: []

- id: move_output
  label: Move Output Window
  kind: action
  params:
    - name: x
      type: integer
      description: X position in pixels
    - name: y
      type: integer
      description: Y position in pixels
    - name: w
      type: integer
      description: Width in pixels
    - name: h
      type: integer
      description: Height in pixels

- id: fullscreen_output
  label: Fullscreen Output
  kind: action
  params: []

- id: toggle_frame
  label: Toggle Frame
  kind: action
  params: []

- id: enable_frame
  label: Enable Frame
  kind: action
  params: []

- id: disable_frame
  label: Disable Frame
  kind: action
  params: []

- id: always_on_top
  label: Toggle Always On Top
  kind: action
  params: []

- id: prevent_sleep
  label: Toggle Prevent Sleep
  kind: action
  params: []

- id: open_output
  label: Open Output Window
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: assets_list
  label: All Assets
  kind: query
  params: []

- id: player_state
  label: Player State
  kind: query
  params: []

- id: settings
  label: Settings
  kind: query
  params: []

- id: version
  label: Version
  kind: query
  params: []

- id: ping
  label: Ping
  kind: query
  params: []

- id: current_time
  label: Current Time
  kind: query
  params: []
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters not tied to actions documented
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- All endpoints use hostname `playoutbee` on port 3000
- Asset index accepts "next", "prev", or "current" in addition to numeric index
- Volume accepts float 0.0-1.0 or incremental +/- prefix
- Rotation values: 0, 90, 180, 270
- Asset action values: 0=Pause, 1=PlayNext, 2=Next, 3=Loop, 4=Reset
- Some endpoints are platform-specific (Raspberry Pi vs Windows/MacOS)
<!-- UNRESOLVED: authentication model not described in source -->
<!-- UNRESOLVED: error response formats not documented -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: bytehive_playoutbee_companion.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T15:28:33.637Z
retrieved_at: 2026-04-23T15:28:33.637Z
last_checked_at: 2026-04-23T15:28:33.637Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:28:33.637Z
matched_actions: 34
action_count: 34
confidence: high
summary: "All 34 spec actions matched literals in source with correct shapes and transport parameters; complete bidirectional coverage."
```

## Known Gaps

```yaml
[]
```
