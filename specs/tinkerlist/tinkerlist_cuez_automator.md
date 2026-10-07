---
spec_id: admin/tinkerlist-cuez-automator
schema_version: ai4av-public-spec-v1
revision: 1
title: "TinkerList Cuez Automator Control Spec"
manufacturer: TinkerList
model_family: "Cuez Automator"
aliases: []
compatible_with:
  manufacturers:
    - TinkerList
  models:
    - "Cuez Automator"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - intercom.help
  - documenter.getpostman.com
source_urls:
  - https://intercom.help/cuez/en/articles/10320001-how-can-i-use-the-automator-api
  - https://documenter.getpostman.com/view/9730337/2s9YeA8tGV
retrieved_at: 2026-04-30T02:09:11.445Z
last_checked_at: 2026-09-27T15:00:10.060Z
generated_at: 2026-09-27T15:00:10.060Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "UDP/OSC support not documented; only HTTP REST endpoints listed"
  - "no settable variables documented"
  - "no unsolicited event notifications documented"
  - "CuezDeck button IDs not enumerated in source"
  - "macro ID format not specified in source"
verification:
  verdict: verified
  checked_at: 2026-09-27T15:00:10.060Z
  matched_actions: 13
  action_count: 13
  confidence: medium
  summary: "All 13 listed GET forms map exactly; authentication and remote-host availability remain explicitly unknown. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# TinkerList Cuez Automator Control Spec

## Summary
REST API control interface for TinkerList Cuez Automator show-control software. All endpoints are HTTP GET. Base URL `http://localhost:7070`. No authentication described. Controls rundown triggers, step buttons, CuezDeck buttons, and macros.

<!-- UNRESOLVED: UDP/OSC support not documented; only HTTP REST endpoints listed -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: http://localhost:7070
  port: 7070  # stated in source
auth:
  type: UNRESOLVED  # Authentication requirements are not stated in the source
```

## Traits
```yaml
- routable   # trigger-based navigation through rundown elements
- queryable # GET endpoints return JSON data (buttons, macros)
```

## Actions
```yaml
- id: trigger_next
  label: Trigger Next
  kind: action
  http:
    method: GET
    path: /api/trigger/next
  params: []

- id: trigger_next_trigger
  label: Trigger Next Trigger
  kind: action
  http:
    method: GET
    path: /api/trigger/nextTrigger
  params: []

- id: trigger_previous
  label: Trigger Previous
  kind: action
  http:
    method: GET
    path: /api/trigger/previous
  params: []

- id: trigger_previous_trigger
  label: Trigger Previous Trigger
  kind: action
  http:
    method: GET
    path: /api/trigger/previousTrigger
  params: []

- id: trigger_step_0
  label: Re-trigger Current Element
  kind: action
  http:
    method: GET
    path: /api/trigger/step/0
  params: []

- id: trigger_first_trigger
  label: Trigger First Element
  kind: action
  http:
    method: GET
    path: /api/trigger/firstTrigger
  params: []

- id: trigger_step_index
  label: Trigger Step by Index
  kind: action
  http:
    method: GET
    path: /api/trigger/step/{index}
  params:
    - name: index
      type: integer
      description: Step index (0-based)

- id: list_buttons
  label: List CuezDeck Buttons
  kind: action
  http:
    method: GET
    path: /api/trigger/button/
  params: []

- id: trigger_button
  label: Trigger CuezDeck Button
  kind: action
  http:
    method: GET
    path: /api/trigger/button/{buttonID}
  params:
    - name: buttonID
      type: string
      description: Button identifier

- id: button_on
  label: Switch Button On
  kind: action
  http:
    method: GET
    path: /api/trigger/button/{buttonID}/on
  params:
    - name: buttonID
      type: string
      description: Button identifier

- id: button_off
  label: Switch Button Off
  kind: action
  http:
    method: GET
    path: /api/trigger/button/{buttonID}/off
  params:
    - name: buttonID
      type: string
      description: Button identifier

- id: list_macros
  label: List Macros
  kind: action
  http:
    method: GET
    path: /api/macro/
  params: []

- id: trigger_macro
  label: Trigger Macro
  kind: action
  http:
    method: GET
    path: /api/macro/{macroID}
  params:
    - name: macroID
      type: string
      description: Macro identifier
```

## Feedbacks
```yaml
- id: button_list
  label: CuezDeck Button List
  type: array
  description: GET /api/trigger/button/ returns JSON array with id fields

- id: macro_list
  label: Macro List
  type: array
  description: GET /api/macro/ returns JSON array with id fields
```

## Variables
```yaml
# UNRESOLVED: no settable variables documented
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
- id: macro_trigger
  label: Trigger Macro by ID
  description: GET /api/macro/{macroID} fires macro by id
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
The source gives the base URL `http://localhost:7070`; whether remote hosts can connect is not documented. Minimum stable build: `2024.10.28-0` or newer. All listed endpoints use HTTP GET. Authentication requirements and request payloads are not documented.
<!-- Port 7070 is explicit in the documented base URL. -->
<!-- UNRESOLVED: CuezDeck button IDs not enumerated in source -->
<!-- UNRESOLVED: macro ID format not specified in source -->

## Provenance

```yaml
source_domains:
  - intercom.help
  - documenter.getpostman.com
source_urls:
  - https://intercom.help/cuez/en/articles/10320001-how-can-i-use-the-automator-api
  - https://documenter.getpostman.com/view/9730337/2s9YeA8tGV
retrieved_at: 2026-04-30T02:09:11.445Z
last_checked_at: 2026-09-27T15:00:10.060Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-27T15:00:10.060Z
matched_actions: 13
action_count: 13
confidence: medium
summary: "All 13 listed GET forms map exactly; authentication and remote-host availability remain explicitly unknown. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "UDP/OSC support not documented; only HTTP REST endpoints listed"
- "no settable variables documented"
- "no unsolicited event notifications documented"
- "CuezDeck button IDs not enumerated in source"
- "macro ID format not specified in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
