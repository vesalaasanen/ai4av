---
schema_version: ai4av-public-spec-v1
device_id: definitive-technology/studio-3d-mini
entity_id: definitive_technology_studio_3d_mini
spec_id: admin/definitive_technology-studio_3d_mini
revision: 1
author: admin
title: "Definitive Technology Studio 3D Mini Control Spec"
status: published
manufacturer: "Definitive Technology"
manufacturer_key: definitive-technology
model_family: "Studio 3D Mini"
aliases: []
compatible_with:
  manufacturers:
    - "Definitive Technology"
  models:
    - "Studio 3D Mini"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: definitive_technology_studio_3d_mini_ir.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T14:43:53.278Z
retrieved_at: 2026-04-27T14:43:53.278Z
last_checked_at: 2026-04-27T14:43:53.278Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T14:43:53.278Z
  matched_actions: 56
  action_count: 56
  confidence: high
  summary: "All 56 spec actions have literal source matches in the HEOS CLI protocol reference; transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Definitive Technology Studio 3D Mini Control Spec

## Summary
Network-connected wireless multi-room music speaker. Control via HEOS CLI over TCP/telnet on port 1255. discovery via UPnP SSDP. supports volume, mute, play state, queue, browse, grouping.

<!-- UNRESOLVED: this doc is Denon HEOS CLI protocol; Definitive Technology Studio 3D Mini uses HEOS platform — command set identical to HEOS BAR/BAR -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 1255  # stated: telnet port 1255
auth:
  type: none  # inferred: no auth required for CLI connection; sign-in is for HEOS account, not CLI access
```

## Traits
```yaml
- powerable       # UNRESOLVED: no power on/off command in HEOS CLI
- routable        # inferred: input source routing commands present
- queryable       # inferred: get_play_state, get_volume, get_mute commands present
- levelable       # inferred: volume up/down/set commands present
```

## Actions
```yaml
- id: register_for_change_events
  label: Register for Change Events
  kind: action
  params:
    - name: enable
      type: enum
      values: [on, off]
      description: Enable or disable change events

- id: system_reboot
  label: Reboot Device
  kind: action
  params: []

- id: player_get_players
  label: Get Players
  kind: action
  params: []

- id: player_get_player_info
  label: Get Player Info
  kind: action
  params:
    - name: pid
      type: integer
      description: Player id

- id: player_get_play_state
  label: Get Play State
  kind: action
  params:
    - name: pid
      type: integer
      description: Player id

- id: player_set_play_state
  label: Set Play State
  kind: action
  params:
    - name: pid
      type: integer
      description: Player id
    - name: state
      type: enum
      values: [play, pause, stop]
      description: Desired play state

- id: player_get_volume
  label: Get Volume
  kind: action
  params:
    - name: pid
      type: integer
      description: Player id

- id: player_set_volume
  label: Set Volume
  kind: action
  params:
    - name: pid
      type: integer
      description: Player id
    - name: level
      type: integer
      description: Volume level 0-100

- id: player_volume_up
  label: Volume Up
  kind: action
  params:
    - name: pid
      type: integer
      description: Player id
    - name: step
      type: integer
      description: Step level 1-10 (default 5)

- id: player_volume_down
  label: Volume Down
  kind: action
  params:
    - name: pid
      type: integer
      description: Player id
    - name: step
      type: integer
      description: Step level 1-10 (default 5)

- id: player_get_mute
  label: Get Mute State
  kind: action
  params:
    - name: pid
      type: integer
      description: Player id

- id: player_set_mute
  label: Set Mute
  kind: action
  params:
    - name: pid
      type: integer
      description: Player id
    - name: state
      type: enum
      values: [on, off]

- id: player_toggle_mute
  label: Toggle Mute
  kind: action
  params:
    - name: pid
      type: integer
      description: Player id

- id: player_get_play_mode
  label: Get Play Mode
  kind: action
  params:
    - name: pid
      type: integer
      description: Player id

- id: player_set_play_mode
  label: Set Play Mode
  kind: action
  params:
    - name: pid
      type: integer
      description: Player id
    - name: repeat
      type: enum
      values: [on_all, on_one, off]
    - name: shuffle
      type: enum
      values: [on, off]

- id: player_get_queue
  label: Get Queue
  kind: action
  params:
    - name: pid
      type: integer
      description: Player id
    - name: range
      type: string
      description: "Range start#, end# (optional)"

- id: player_play_queue
  label: Play Queue Item
  kind: action
  params:
    - name: pid
      type: integer
      description: Player id
    - name: qid
      type: integer
      description: Queue id for song

- id: player_remove_from_queue
  label: Remove from Queue
  kind: action
  params:
    - name: pid
      type: integer
      description: Player id
    - name: qid
      type: string
      description: Comma-separated queue ids

- id: player_save_queue
  label: Save Queue as Playlist
  kind: action
  params:
    - name: pid
      type: integer
      description: Player id
    - name: name
      type: string
      description: Playlist name (max 128 unicode)

- id: player_clear_queue
  label: Clear Queue
  kind: action
  params:
    - name: pid
      type: integer
      description: Player id

- id: player_move_queue_item
  label: Move Queue Item
  kind: action
  params:
    - name: pid
      type: integer
      description: Player id
    - name: sqid
      type: string
      description: Source queue ids (comma-separated)
    - name: dqid
      type: integer
      description: Destination queue id

- id: player_play_next
  label: Play Next
  kind: action
  params:
    - name: pid
      type: integer
      description: Player id

- id: player_play_previous
  label: Play Previous
  kind: action
  params:
    - name: pid
      type: integer
      description: Player id

- id: group_get_groups
  label: Get Groups
  kind: action
  params: []

- id: group_get_group_info
  label: Get Group Info
  kind: action
  params:
    - name: gid
      type: integer
      description: Group id

- id: group_set_group
  label: Set Group
  kind: action
  params:
    - name: pid
      type: string
      description: Comma-separated player ids (first is leader)

- id: group_get_volume
  label: Get Group Volume
  kind: action
  params:
    - name: gid
      type: integer
      description: Group id

- id: group_set_volume
  label: Set Group Volume
  kind: action
  params:
    - name: gid
      type: integer
      description: Group id
    - name: level
      type: integer
      description: Volume level 0-100

- id: group_volume_up
  label: Group Volume Up
  kind: action
  params:
    - name: gid
      type: integer
      description: Group id
    - name: step
      type: integer
      description: Step level 1-10 (default 5)

- id: group_volume_down
  label: Group Volume Down
  kind: action
  params:
    - name: gid
      type: integer
      description: Group id
    - name: step
      type: integer
      description: Step level 1-10 (default 5)

- id: group_get_mute
  label: Get Group Mute
  kind: action
  params:
    - name: gid
      type: integer
      description: Group id

- id: group_set_mute
  label: Set Group Mute
  kind: action
  params:
    - name: gid
      type: integer
      description: Group id
    - name: state
      type: enum
      values: [on, off]

- id: group_toggle_mute
  label: Toggle Group Mute
  kind: action
  params:
    - name: gid
      type: integer
      description: Group id

- id: browse_get_music_sources
  label: Get Music Sources
  kind: action
  params: []

- id: browse_browse
  label: Browse Source
  kind: action
  params:
    - name: sid
      type: integer
      description: Source id
    - name: cid
      type: string
      description: Container id (optional)
    - name: range
      type: string
      description: Range start#, end# (optional)

- id: browse_search
  label: Search
  kind: action
  params:
    - name: sid
      type: integer
      description: Source id
    - name: search
      type: string
      description: Search string (max 128 unicode)
    - name: scid
      type: string
      description: Search criteria id
    - name: range
      type: string
      description: Range start#, end# (optional)

- id: browse_play_stream
  label: Play Stream
  kind: action
  params:
    - name: pid
      type: integer
      description: Player id
    - name: sid
      type: integer
      description: Source id
    - name: cid
      type: string
      description: Container id (optional)
    - name: mid
      type: string
      description: Media id
    - name: name
      type: string
      description: Station name (optional)

- id: browse_play_preset
  label: Play Preset Station
  kind: action
  params:
    - name: pid
      type: integer
      description: Player id
    - name: preset
      type: integer
      description: Preset position (1+)

- id: browse_play_input
  label: Play Input Source
  kind: action
  params:
    - name: pid
      type: integer
      description: Destination player id
    - name: spid
      type: integer
      description: Source player id (optional, for playing on another speaker)
    - name: input
      type: string
      description: Input source name

- id: browse_add_to_queue
  label: Add to Queue
  kind: action
  params:
    - name: pid
      type: integer
      description: Player id
    - name: sid
      type: integer
      description: Source id
    - name: cid
      type: string
      description: Container id
    - name: mid
      type: string
      description: Media id (for tracks)
    - name: aid
      type: integer
      description: Add criteria (1=play now, 2=play next, 3=add to end, 4=replace and play)

- id: system_sign_in
  label: Sign In to HEOS Account
  kind: action
  params:
    - name: un
      type: string
      description: HEOS account username
    - name: pw
      type: string
      description: HEOS account password

- id: system_sign_out
  label: Sign Out of HEOS Account
  kind: action
  params: []

- id: system_check_account
  label: Check HEOS Account
  kind: action
  params: []

- id: system_heart_beat
  label: Heart Beat
  kind: action
  params: []
- id: system_prettify_json_response
  label: Prettify JSON Response
  kind: action
  params:
    - name: enable
      type: enum
      values: [on, off]
      description: Enable or disable prettification of JSON response

- id: player_get_now_playing_media
  label: Get Now Playing Media
  kind: action
  params:
    - name: pid
      type: integer
      description: Player id

- id: player_set_quickselect
  label: Set QuickSelect
  kind: action
  params:
    - name: pid
      type: integer
      description: Player id
    - name: id
      type: integer
      description: Quick select id (1-6)

- id: player_play_quickselect
  label: Play QuickSelect
  kind: action
  params:
    - name: pid
      type: integer
      description: Player id
    - name: id
      type: integer
      description: Quick select id (1-6)

- id: player_get_quickselects
  label: Get QuickSelects
  kind: action
  params:
    - name: pid
      type: integer
      description: Player id
    - name: id
      type: integer
      description: Optional quick select id (1-6)

- id: player_check_update
  label: Check for Firmware Update
  kind: action
  params:
    - name: pid
      type: integer
      description: Player id

- id: browse_get_source_info
  label: Get Source Info
  kind: action
  params:
    - name: sid
      type: integer
      description: Source id

- id: browse_get_search_criteria
  label: Get Source Search Criteria
  kind: action
  params:
    - name: sid
      type: integer
      description: Source id

- id: browse_rename_playlist
  label: Rename HEOS Playlist
  kind: action
  params:
    - name: sid
      type: integer
      description: Source id
    - name: cid
      type: string
      description: Container id of playlist to rename
    - name: name
      type: string
      description: New playlist name (max 128 unicode)

- id: browse_delete_playlist
  label: Delete HEOS Playlist
  kind: action
  params:
    - name: sid
      type: integer
      description: Source id
    - name: cid
      type: string
      description: Container id of playlist to delete

- id: browse_retrieve_metadata
  label: Retrieve Album Metadata
  kind: action
  params:
    - name: sid
      type: integer
      description: Source id
    - name: cid
      type: string
      description: Album id

- id: browse_set_service_option
  label: Set Service Option
  kind: action
  params:
    - name: sid
      type: integer
      description: Source id
    - name: option
      type: integer
      description: Option id (1-13)
    - name: mid
      type: string
      description: Media id (context-dependent)
    - name: cid
      type: string
      description: Container id (context-dependent)
    - name: pid
      type: integer
      description: Player id (context-dependent)
    - name: name
      type: string
      description: Name string (context-dependent)
    - name: scid
      type: string
      description: Search criteria id (context-dependent)
```

## Feedbacks
```yaml
# All HEOS commands return JSON with structure:
# { heos: { command, result, message }, payload: { ... } }
# UNRESOLVED: specific feedback schemas per command - see full command details above
```

## Variables
```yaml
# UNRESOLVED: no discrete variable parameters beyond action inputs
```

## Events
```yaml
# UNRESOLVED: device sends change events when register_for_change_events enable=on
# Event types include: player_state_changed, player_queue_changed, group_volume_changed
# Full event list not documented in source
```

## Macros
```yaml
# UNRESOLVED: no explicit macro sequences in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command format: `heos://command_group/command?attr1=val1&attr2=val2\r\n`. delimiter: `\r\n`. response: JSON. port 1255 TCP. Max 32 simultaneous socket connections per speaker. CLI module starts in dormant mode — first connection spawns CLI core. UPnP discovery ST: `urn:schemas-denon-com:device:ACT-Denon:1`.
<!-- UNRESOLVED: Definitive Technology Studio 3D Mini specific command coverage not verified against device -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: definitive_technology_studio_3d_mini_ir.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T14:43:53.278Z
retrieved_at: 2026-04-27T14:43:53.278Z
last_checked_at: 2026-04-27T14:43:53.278Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T14:43:53.278Z
matched_actions: 56
action_count: 56
confidence: high
summary: "All 56 spec actions have literal source matches in the HEOS CLI protocol reference; transport parameters verified."
```

## Known Gaps

```yaml
[]
```
