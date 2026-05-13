---
spec_id: admin/dataton-watchout
schema_version: ai4av-public-spec-v1
revision: 1
title: "Dataton Watchout HTTP API Control Spec"
manufacturer: Dataton
model_family: "Dataton Watchout"
aliases: []
compatible_with:
  manufacturers:
    - Dataton
  models:
    - "Dataton Watchout"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.dataton.com
retrieved_at: 2026-04-30T04:41:03.688Z
last_checked_at: 2026-04-23T15:32:50.465Z
generated_at: 2026-04-23T15:32:50.465Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-23T15:32:50.465Z
  matched_actions: 26
  action_count: 26
  confidence: high
  summary: "All 26 spec actions matched literally in source; transport (http, port 3019, 3017 for nodes) verified; no fabrications or drift."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Dataton Watchout HTTP API Control Spec

## Summary
Dataton Watchout is a multi-display production and playback system. This spec covers its HTTP REST API for show control, including timeline playback, input management, cue sequencing, and event streams. Default API port is 3019.

<!-- UNRESOLVED: RS-232, TCP, or other control protocols not documented in source -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: http://localhost:3019
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # UNRESOLVED: no explicit power commands in source
- routable        # inferred: input routing commands present
- queryable       # inferred: state query endpoints present
```

## Actions
```yaml
- id: play_all_timelines
  label: Play All Timelines
  kind: action
  params: []

- id: play_timeline
  label: Play Timeline by ID
  kind: action
  params:
    - name: timeline_id
      type: integer
      description: Timeline ID

- id: pause_timeline
  label: Pause Timeline by ID
  kind: action
  params:
    - name: timeline_id
      type: integer
      description: Timeline ID

- id: stop_timeline
  label: Stop Timeline by ID
  kind: action
  params:
    - name: timeline_id
      type: integer
      description: Timeline ID

- id: jump_to_time
  label: Jump to Time
  kind: action
  params:
    - name: timeline_id
      type: integer
      description: Timeline ID
    - name: time
      type: integer
      description: Time in milliseconds
    - name: state
      type: string
      description: "play or pause"

- id: jump_to_cue
  label: Jump to Cue
  kind: action
  params:
    - name: timeline_id
      type: integer
      description: Timeline ID
    - name: cue_id
      type: integer
      description: Cue ID
    - name: state
      type: string
      description: "play or pause"

- id: send_msc
  label: Send MSC (MIDI Show Control)
  kind: action
  params:
    - name: command
      type: object
      description: MSC command object e.g. {"go": {}}

- id: set_inputs
  label: Set Multiple Inputs
  kind: action
  params:
    - name: inputs
      type: array
      description: Array of input objects with key, value, and optional duration

- id: set_single_input
  label: Set Single Input by Name
  kind: action
  params:
    - name: key
      type: string
      description: Input key name
    - name: value
      type: number
      description: Input value (0.0 to 1.0)

- id: load_show_json
  label: Load Show from JSON
  kind: action
  params:
    - name: show_data
      type: object
      description: Show JSON data

- id: load_show_file
  label: Load Show from .watch File
  kind: action
  params:
    - name: show_file
      type: string
      description: Path to .watch file (sent as binary)

- id: switch_cue_variant_by_id
  label: Switch Cue Variant by ID
  kind: action
  params:
    - name: group_id
      type: string
      description: Cue group ID
    - name: variant_id
      type: string
      description: Variant ID

- id: switch_cue_variant_by_name
  label: Switch Cue Variant by Name
  kind: action
  params:
    - name: group_name
      type: string
      description: Cue group name
    - name: variant_name
      type: string
      description: Variant name

- id: switch_multiple_variants_by_id
  label: Switch Multiple Variants by ID
  kind: action
  params:
    - name: variants
      type: object
      description: Map of groupId to variantId

- id: switch_multiple_variants_by_name
  label: Switch Multiple Variants by Name
  kind: action
  params:
    - name: variants
      type: object
      description: Map of groupName to variantName

- id: reset_all_cue_variants
  label: Reset All Cue Variants to Default
  kind: action
  params: []

- id: shutdown_node
  label: Shutdown Node
  kind: action
  params:
    - name: node_ip
      type: string
      description: Target node IP address (port 3017)

- id: reboot_node
  label: Reboot Node
  kind: action
  params:
    - name: node_ip
      type: string
      description: Target node IP address (port 3017)

- id: restart_node_services
  label: Restart Node Services
  kind: action
  params:
    - name: node_ip
      type: string
      description: Target node IP address (port 3017)
```

## Feedbacks
```yaml
- id: software_version
  label: Software Version
  type: string
  query: GET /info

- id: playback_state
  label: Playback State
  type: object
  query: GET /v0/state

- id: timelines
  label: Timelines
  type: array
  query: GET /v0/timelines

- id: timeline_cues
  label: Timeline Cues
  type: array
  query: GET /v0/cues/{timeline_id}

- id: inputs
  label: All Inputs
  type: array
  query: GET /v0/inputs

- id: current_show
  label: Current Show
  type: object
  query: GET /v0/show

- id: cue_group_state_by_id
  label: Cue Group State by ID
  type: object
  query: GET /v0/cue-group-state/by-id

- id: cue_group_state_by_name
  label: Cue Group State by Name
  type: object
  query: GET /v0/cue-group-state/by-name

- id: hit_test_result
  label: Hit Test Result
  type: object
  query: POST /v0/hittest
  description: Returns cues hit at given stage coordinates
```

## Variables
```yaml
- id: input_value
  label: Input Value
  type: number
  range: [0.0, 1.0]
  description: Input level value

- id: cue_variant
  label: Cue Variant Selection
  type: string
  description: Active variant for a cue group
```

## Events
```yaml
- id: playback_state_event
  type: PlaybackState
  stream: SSE v0, v1, v2; NDJSON v2
  description: Current playback state

- id: cue_visibility_event
  type: CueVisibility
  stream: SSE v0, v1, v2; NDJSON v2
  description: Cue visibility changes

- id: inputs_event
  type: Inputs
  stream: SSE v1, v2; NDJSON v2
  description: Input value changes

- id: show_revision_event
  type: ShowRevision
  stream: SSE v1, v2; NDJSON v2
  description: Show revision updates

- id: timeline_countdowns_event
  type: TimelineCountdowns
  stream: SSE v2; NDJSON v2
  description: Countdown/countup timing to cues with status: Pre, Last10, Last5, Reached
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- API base URL defaults to `http://localhost:3019`; production deployments use the server IP
- Node management endpoints use port 3017 (e.g. `http://192.168.1.2:3017`)
- Timeline and cue IDs are numeric and stable across renames
- Event streams available in SSE (3 versions) and NDJSON formats
- Only visual media cues without conditional rendering supported for hit-test
- Windows PowerShell requires `curl.exe` or alias removal; JSON single quotes not supported
<!-- UNRESOLVED: default port 3019 not explicitly confirmed as production default, only localhost example shown -->

## Provenance

```yaml
source_domains:
  - docs.dataton.com
retrieved_at: 2026-04-30T04:41:03.688Z
last_checked_at: 2026-04-23T15:32:50.465Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:32:50.465Z
matched_actions: 26
action_count: 26
confidence: high
summary: "All 26 spec actions matched literally in source; transport (http, port 3019, 3017 for nodes) verified; no fabrications or drift."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
