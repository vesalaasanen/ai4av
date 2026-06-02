---
spec_id: admin/dataton-watchout-7
schema_version: ai4av-public-spec-v1
revision: 1
title: "Dataton WATCHOUT 7 Control Spec"
manufacturer: Dataton
model_family: "WATCHOUT 7"
aliases: []
compatible_with:
  manufacturers:
    - Dataton
  models:
    - "WATCHOUT 7"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.dataton.com
  - knowledge.dataton.com
source_urls:
  - https://docs.dataton.com/watchout-7/external_protocol/external_protocol.html
  - https://knowledge.dataton.com/migration/knowledge/watchout-display-control-protocol
  - https://docs.dataton.com/watchout-7/
retrieved_at: 2026-04-29T23:27:46.172Z
last_checked_at: 2026-04-27T14:41:59.431Z
generated_at: 2026-04-27T14:41:59.431Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no power on/off commands in source"
  - "powerable - no power commands in source"
  - "node identification method not specified"
  - "specific variable keys not stated in source - defined per show"
  - "no explicit multi-step macros in source"
  - "no interlock procedures stated in source"
  - "firmware version compatibility not stated"
  - "no power commands in source"
  - "authentication token format not applicable — no auth"
  - "specific input variable keys defined per show, not in source"
verification:
  verdict: verified
  checked_at: 2026-04-27T14:41:59.431Z
  matched_actions: 19
  action_count: 19
  confidence: medium
  summary: "All 19 spec actions match literally to documented HTTP endpoints; transport parameters verified; operative API fully represented. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Dataton WATCHOUT 7 Control Spec

## Summary
Media show control server. HTTP REST API on port 3019 for playback, timeline, cue, and input control. Secondary node management API on port 3017. SSE/NDJSON event streams for real-time state. No authentication required.

<!-- UNRESOLVED: no power on/off commands in source -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: http://{host}:3019
auth:
  type: none  # inferred: source states no auth required
```

## Traits
```yaml
# UNRESOLVED: powerable - no power commands in source
- routable   # timeline/cue routing commands present
- queryable  # state query endpoints present
- levelable # input variables (brightness, volume) present
```

## Actions
```yaml
- id: play_all
  label: Play All Timelines
  kind: action
  params: []

- id: play_timeline
  label: Play Timeline
  kind: action
  params:
    - name: timeline_id
      type: integer
      description: Numeric timeline ID

- id: pause_timeline
  label: Pause Timeline
  kind: action
  params:
    - name: timeline_id
      type: integer
      description: Numeric timeline ID

- id: stop_timeline
  label: Stop Timeline
  kind: action
  params:
    - name: timeline_id
      type: integer
      description: Numeric timeline ID

- id: jump_to_time
  label: Jump to Time
  kind: action
  params:
    - name: timeline_id
      type: integer
      description: Numeric timeline ID
    - name: time
      type: integer
      description: Time in milliseconds
    - name: state
      type: string
      description: Optional; "play" or "pause" (default "pause")

- id: jump_to_cue
  label: Jump to Cue
  kind: action
  params:
    - name: timeline_id
      type: integer
      description: Numeric timeline ID
    - name: cue_id
      type: integer
      description: Numeric cue ID
    - name: state
      type: string
      description: Optional; "play" or "pause" (default "pause")

- id: load_show
  label: Load Show
  kind: action
  params:
    - name: show_json
      type: object
      description: Show JSON body

- id: load_showfile
  label: Load Show File
  kind: action
  params:
    - name: data
      type: string
      description: Binary .watch data
    - name: showName
      type: string
      description: Optional show name query param

- id: set_inputs
  label: Set Multiple Inputs
  kind: action
  params:
    - name: inputs
      type: array
      description: JSON array of {key, value, duration}

- id: set_input
  label: Set One Input
  kind: action
  params:
    - name: key
      type: string
      description: Input variable key
    - name: value
      type: number
      description: Value to apply
    - name: duration
      type: integer
      description: Optional interpolation duration in ms

- id: set_cue_group_state_by_id
  label: Set Cue Group State by IDs
  kind: action
  params:
    - name: updates
      type: object
      description: JSON map groupId -> variantId

- id: set_cue_group_state_by_name
  label: Set Cue Group State by Names
  kind: action
  params:
    - name: updates
      type: object
      description: JSON map groupName -> variantName

- id: hittest
  label: Hit Test Stage Coordinates
  kind: action
  params:
    - name: cues
      type: array
      description: Array of cue ID strings
    - name: x
      type: number
      description: X coordinate
    - name: y
      type: number
      description: Y coordinate

- id: send_msc
  label: Send MIDI Show Control
  kind: action
  params:
    - name: commands
      type: array
      description: JSON array of MSC commands

- id: shutdown_node
  label: Shutdown Node OS
  kind: action
  params:
    - name: node_host
      type: string
      description: Target node host (port 3017)
    # UNRESOLVED: node identification method not specified

- id: reboot_node
  label: Reboot Node OS
  kind: action
  params:
    - name: node_host
      type: string
      description: Target node host (port 3017)

- id: restart_services
  label: Restart WATCHOUT Services
  kind: action
  params:
    - name: node_host
      type: string
      description: Target node host (port 3017)
- id: set_cue_group_state_by_id_single
  label: Set One Cue Group State by IDs
  kind: action
  params:
    - name: group_id
      type: integer
      description: Numeric cue group ID (path param)
    - name: variant_id
      type: integer
      description: Numeric variant ID to activate (path param)

- id: set_cue_group_state_by_name_single
  label: Set One Cue Group State by Names
  kind: action
  params:
    - name: group_name
      type: string
      description: Cue group name (path param)
    - name: variant_name
      type: string
      description: Variant name to activate (path param)
```

## Feedbacks
```yaml
- id: playback_state
  label: Playback State
  type: object
  description: Playback state for all timelines (GET /v0/state)

- id: show_state
  label: Show State
  type: object
  description: Full current show JSON (GET /v0/show)

- id: timeline_list
  label: Timeline List
  type: array
  description: List of timelines with IDs and names (GET /v0/timelines)

- id: cue_list
  label: Cue List
  type: array
  description: List of cues for a timeline (GET /v0/cues/{timeline_id})

- id: input_specs
  label: Input Variable Specs
  type: array
  description: All input variable specs with keys and ranges (GET /v0/inputs)

- id: cue_group_state_by_id
  label: Cue Group State by IDs
  type: object
  description: Cue set states by group IDs (GET /v0/cue-group-state/by-id)

- id: cue_group_state_by_name
  label: Cue Group State by Names
  type: object
  description: Cue set states by group names (GET /v0/cue-group-state/by-name)

- id: system_info
  label: System Info
  type: object
  description: Build/version info (GET /info)

- id: hittest_result
  label: Hit Test Result
  type: object
  description: Cues containing a stage point (POST /v0/hittest)
```

## Variables
```yaml
# Input variables: brightness, volume, etc.
# Key and range defined per SHOW in WATCHOUT
# UNRESOLVED: specific variable keys not stated in source - defined per show
```

## Events
```yaml
# SSE/NDJSON streams on port 3019
- id: PlaybackState
  description: Timeline playback state changes
- id: Inputs
  description: Input variable changes
- id: ShowRevision
  description: Show revision updates
- id: CueVisibility
  description: Cue visibility changes
- id: TimelineCountdowns
  description: Timeline countdown status (v2 streams only)
  properties:
    - name: status
      type: string
      enum: [Pre, Last10, Last5, Reached]
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros in source
```

## Safety
```yaml
confirmation_required_for:
  - shutdown_node  # shuts down target node OS
  - reboot_node    # reboots target node OS
interlocks: []
# UNRESOLVED: no interlock procedures stated in source
```

## Notes
HTTP API ports: 3019 (operative), 3017 (node management), 3023 (asset manager). Port 3017 endpoints: shutdown, reboot, restart services. Stream versions: SSE v0/v1/v2, NDJSON v0/v1/v2. Timeline and cue IDs retrieved via "Copy ID" in Producer. Hit testing only works with visual media cues without conditional rendering. HTTP Output cues send outbound requests — separate from inbound control API.
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: no power commands in source -->
<!-- UNRESOLVED: authentication token format not applicable — no auth -->
<!-- UNRESOLVED: specific input variable keys defined per show, not in source -->

## Provenance

```yaml
source_domains:
  - docs.dataton.com
  - knowledge.dataton.com
source_urls:
  - https://docs.dataton.com/watchout-7/external_protocol/external_protocol.html
  - https://knowledge.dataton.com/migration/knowledge/watchout-display-control-protocol
  - https://docs.dataton.com/watchout-7/
retrieved_at: 2026-04-29T23:27:46.172Z
last_checked_at: 2026-04-27T14:41:59.431Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T14:41:59.431Z
matched_actions: 19
action_count: 19
confidence: medium
summary: "All 19 spec actions match literally to documented HTTP endpoints; transport parameters verified; operative API fully represented. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no power on/off commands in source"
- "powerable - no power commands in source"
- "node identification method not specified"
- "specific variable keys not stated in source - defined per show"
- "no explicit multi-step macros in source"
- "no interlock procedures stated in source"
- "firmware version compatibility not stated"
- "no power commands in source"
- "authentication token format not applicable — no auth"
- "specific input variable keys defined per show, not in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
