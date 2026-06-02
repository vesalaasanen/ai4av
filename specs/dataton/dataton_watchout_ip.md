---
spec_id: admin/dataton-watchout-ip
schema_version: ai4av-public-spec-v1
revision: 1
title: "Dataton WATCHOUT HTTP API Control Spec"
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
source_urls:
  - https://docs.dataton.com/watchout-7/external_protocol/external_protocol.html
retrieved_at: 2026-04-30T04:46:13.343Z
last_checked_at: 2026-06-02T22:05:46.100Z
generated_at: 2026-06-02T22:05:46.100Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "physical RS-232 serial control not documented in source"
  - "no safety warnings or interlock procedures in source"
  - "physical RS-232 serial protocol not documented"
  - "default TCP port for Watchout production deployments not confirmed in source (3019 is localhost default)"
  - "authentication mechanism for production deployments not documented"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:05:46.100Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions traced to source (dip-safe re-verify). (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Dataton WATCHOUT HTTP API Control Spec

## Summary
WATCHOUT is a multi-display presentation and show control system. This spec covers the HTTP REST API for controlling playback, managing timelines and cues, manipulating inputs, loading shows, and monitoring event streams. The API uses port 3019 for Director commands and port 3017 for direct node management. No authentication is required.

<!-- UNRESOLVED: physical RS-232 serial control not documented in source -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: http://localhost:3019
auth:
  type: none  # inferred: no auth procedure in source
```

**Node management uses a different port:**
```yaml
addressing:
  node_base_url: http://<node-ip>:3017
```

## Traits
```yaml
- queryable       # inferred: GET endpoints for playback state, timelines, cues, inputs
- routable        # inferred: input set commands present
- levelable       # inferred: input value parameter (0.0-1.0 range)
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
      description: JSON command object, e.g. {"go": {}}

- id: set_multiple_inputs
  label: Set Multiple Inputs
  kind: action
  params:
    - name: inputs
      type: array
      description: Array of {key: string, value: number, duration?: number}
    - name: value
      type: number
      description: Input value (0.0-1.0)
    - name: duration
      type: integer
      description: "Optional interpolation duration in milliseconds"

- id: set_single_input
  label: Set Single Input by Name
  kind: action
  params:
    - name: key
      type: string
      description: Input name
    - name: value
      type: number
      description: Input value (0.0-1.0)

- id: load_show_json
  label: Load Show from JSON
  kind: action
  params:
    - name: show_data
      type: string
      description: JSON show data

- id: load_show_file
  label: Load Show from .watch File
  kind: action
  params:
    - name: show_file
      type: string
      description: Binary .watch file data
    - name: show_name
      type: string
      description: "Optional show name"

- id: hittest
  label: Hit Test
  kind: action
  params:
    - name: cues
      type: array
      description: Array of cue IDs to test
    - name: x
      type: number
      description: X coordinate
    - name: y
      type: number
      description: Y coordinate

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

- id: reset_cue_groups_default
  label: Reset All Cue Groups to Default
  kind: action
  params: []

- id: node_shutdown
  label: Shutdown Node
  kind: action
  params: []

- id: node_reboot
  label: Reboot Node
  kind: action
  params: []

- id: node_restart_services
  label: Restart Node Services
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: playback_state
  label: Current Playback State
  type: enum
  values: [playing, paused, stopped]
  query: GET /v0/state

- id: timelines
  label: Timeline List
  type: array
  query: GET /v0/timelines

- id: timeline_cues
  label: Timeline Cues
  type: array
  query: GET /v0/cues/{timeline_id}

- id: inputs
  label: Input States
  type: array
  query: GET /v0/inputs

- id: current_show
  label: Current Show
  type: object
  query: GET /v0/show

- id: cue_group_states_by_id
  label: Cue Group States by ID
  type: object
  query: GET /v0/cue-group-state/by-id

- id: cue_group_states_by_name
  label: Cue Group States by Name
  type: object
  query: GET /v0/cue-group-state/by-name

- id: hit_test_result
  label: Hit Test Result
  type: object
  description: Returns {hit_cues: [...]} for cues at given coordinates
  query: POST /v0/hittest
```

## Variables
```yaml
# No discrete settable parameters beyond input values.
# Input values are controlled via actions set_multiple_inputs / set_single_input.
```

## Events
```yaml
# SSE / NDJSON endpoints at /v0/sse, /v1/sse, /v2/sse, /v2/ndjson

- id: PlaybackState
  description: Playback state changes (play/pause/stop)
  versions: [v0, v1, v2]

- id: CueVisibility
  description: Cue visibility changes
  versions: [v0, v1, v2]

- id: Inputs
  description: Input value changes
  versions: [v1, v2]

- id: ShowRevision
  description: Show revision updates
  versions: [v1, v2]

- id: TimelineCountdowns
  description: Countdown/countup timing to cues with status Pre/Last10/Last5/Reached
  versions: [v2]
```

## Macros
```yaml
# No explicit multi-step macros documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
<!-- UNRESOLVED: no safety warnings or interlock procedures in source -->
```

## Notes

**Port usage:** Director API uses port 3019. Individual node commands use port 3017.

**API version paths:** Commands use `/v0/` prefix (e.g. `/v0/play`, `/v0/state`). Event streams have versioned endpoints (`/v0/sse`, `/v1/sse`, `/v2/sse`).

**Input values:** Input parameters accept floating point values in the 0.0–1.0 range. Optional `duration` parameter enables interpolation over a specified milliseconds window.

**Cue IDs:** Timeline and cue IDs are numeric and stable across renames. Right-click context menu in Producer provides Copy ID function.

**MSC support:** The API accepts MIDI Show Control commands via POST to `/v0/msc` with JSON payload.

**Windows PowerShell:** JSON single quotes do not work; escape double quotes or use here-strings.

<!-- UNRESOLVED: physical RS-232 serial protocol not documented -->
<!-- UNRESOLVED: default TCP port for Watchout production deployments not confirmed in source (3019 is localhost default) -->
<!-- UNRESOLVED: authentication mechanism for production deployments not documented -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - docs.dataton.com
source_urls:
  - https://docs.dataton.com/watchout-7/external_protocol/external_protocol.html
retrieved_at: 2026-04-30T04:46:13.343Z
last_checked_at: 2026-06-02T22:05:46.100Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:05:46.100Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions traced to source (dip-safe re-verify). (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "physical RS-232 serial control not documented in source"
- "no safety warnings or interlock procedures in source"
- "physical RS-232 serial protocol not documented"
- "default TCP port for Watchout production deployments not confirmed in source (3019 is localhost default)"
- "authentication mechanism for production deployments not documented"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
