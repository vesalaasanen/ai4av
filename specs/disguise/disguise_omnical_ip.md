---
spec_id: admin/disguise-omnical
schema_version: ai4av-public-spec-v1
revision: 2
title: "disguise OmniCal Control Spec"
manufacturer: disguise
model_family: OmniCal
aliases: []
compatible_with:
  manufacturers:
    - disguise
  models:
    - OmniCal
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - developer.disguise.one
source_urls:
  - https://developer.disguise.one/api/session/omnical
retrieved_at: 2026-08-31T10:49:55.483Z
last_checked_at: 2026-08-31T11:10:41.561Z
generated_at: 2026-08-31T11:10:41.561Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "OmniCal QuickAlign adjustments are not exposed via the API per source."
  - "no settable parameters documented beyond action params"
  - "no unsolicited push/streaming events documented"
  - "no explicit safety warnings beyond discovery resource note"
  - "port number, auth scheme, firmware version, and RequestPlansFilter enum values not stated in source."
verification:
  verdict: verified
  checked_at: 2026-08-31T11:10:41.561Z
  matched_actions: 13
  action_count: 13
  confidence: medium
  summary: "All 13 spec endpoints (URLs, methods, and params) match the refined source one-to-one; transport base_url is verbatim. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-31
---

# disguise OmniCal Control Spec

## Summary
Disguise OmniCal camera-based projector calibration subsystem, controlled via a JSON-over-HTTP REST API exposed by the Director session. The spec covers OmniCal general endpoints (camera discovery, current plan, plans list) and the RigCheck workflow endpoints (execute plan, poll result, accept/revert, list/delete results).

<!-- UNRESOLVED: OmniCal QuickAlign adjustments are not exposed via the API per source. -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: http://127.0.0.1/api/session/omnical
# Port not stated in source; example calls use 127.0.0.1 default HTTP.
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# No powerable/routable/levelable traits apply - this is a calibration
# workflow API, not a routable device.
- queryable  # inferred: GET query endpoints return plan/result/discovery state
```

## Actions
```yaml
- id: get_camera_discovery
  label: Get Camera Discovery Status
  kind: query
  command: "GET /api/session/omnical/cameradiscovery"
  params: []

- id: set_camera_discovery
  label: Set Camera Discovery
  kind: action
  command: "POST /api/session/omnical/cameradiscovery"
  params:
    - name: enabled
      type: boolean
      description: true to enable, false to disable

- id: get_current_plan
  label: Get Current OmniCal Plan
  kind: query
  command: "GET /api/session/omnical/currentplan"
  params: []

- id: get_plans
  label: List OmniCal Plans
  kind: query
  command: "GET /api/session/omnical/plans"
  params:
    - name: filter
      type: string
      description: RequestPlansFilter enum value

- id: execute_plan
  label: Execute RigCheck Plan
  kind: action
  command: "POST /api/session/omnical/rigcheck/executeplan"
  params: []

- id: check_result
  label: Check RigCheck Result
  kind: query
  command: "GET /api/session/omnical/rigcheck/checkresult"
  params: []

- id: accept_result
  label: Accept RigCheck Result
  kind: action
  command: "POST /api/session/omnical/rigcheck/acceptresult"
  params: []

- id: revert_result
  label: Revert RigCheck Result
  kind: action
  command: "POST /api/session/omnical/rigcheck/revertresult"
  params: []

- id: get_current_result
  label: Get Current RigCheck Result
  kind: query
  command: "GET /api/session/omnical/rigcheck/currentresult"
  params: []

- id: get_current_fallback_result
  label: Get Current Fallback Result
  kind: query
  command: "GET /api/session/omnical/rigcheck/currentfallbackresult"
  params: []

- id: get_results
  label: List RigCheck Results
  kind: query
  command: "GET /api/session/omnical/rigcheck/results"
  params:
    - name: filter
      type: string
      description: RequestPlansFilter enum value

- id: get_results_for_plan
  label: List Results for Plan
  kind: query
  command: "GET /api/session/omnical/rigcheck/resultsforplan"
  params:
    - name: uid
      type: integer
      description: uint64 plan UID
    - name: name
      type: string
      description: Plan name
    - name: filter
      type: string
      description: RequestPlansFilter enum value

- id: delete_old_results
  label: Delete Old RigCheck Results
  kind: action
  command: "POST /api/session/omnical/rigcheck/deleteoldresults"
  params: []
```

## Feedbacks
```yaml
- id: camera_discovery_status
  type: object
  description: |
    enabled (bool), discovery (string: e.g. UNKNOWN)

- id: current_plan
  type: object
  description: |
    plan.name (string), plan.uid (string)

- id: plans_list
  type: object
  description: |
    plans: array of {name, uid}

- id: rigcheck_result
  type: object
  description: |
    result.status (enum: UNKNOWN/Green/Amber/Red),
    result.feedback (string),
    result.omniCalScore (number; lower = better),
    result.cameraRmsError (number),
    result.projectorRmsError (number).
    While RigCheck runs: status "Amber", feedback "RigCheck still in progress.",
    all scores 10000 (sentinel). On failure: status "Red", e.g. feedback
    "Incomplete capture.", scores 10000. On success: status "Green", e.g.
    omniCalScore 0.2, cameraRmsError 0.200915024, projectorRmsError 0.184068009.

- id: task_progress
  type: object
  description: |
    While a RigCheck is in progress, checkresult status.message carries Execute
    Plan Task state, e.g. "Execute Plan Task state: complete=0, success=0,
    cancelled=0, fatalErrors=0, progress=0.57" plus the most recent Result name,
    e.g. "Most recent OmniCal task is real RigCheck Result: 'plan 12mm_result_000'."

- id: current_result
  type: object
  description: |
    result.name (string), result.uid (string)

- id: current_fallback_result
  type: object
  description: |
    Fallback Result identity from GET rigcheck/currentfallbackresult:
    result.name (string), result.uid (string)

- id: results_list
  type: object
  description: |
    results: array of {name, uid}

- id: deletion_summary
  type: object
  description: |
    deleteoldresults response message summarizing deletions, e.g.
    "OmniCal: Deleted 2/5 old unused RigCheck Results:\nplan 12mm_result_000,
    plan 12mm_result_001\nAnother 3 are either newer or in use."

- id: api_status
  type: object
  description: |
    Every response wraps payload in status { code (int), message (string), details (array of {type_url, value}) }
```

## Variables
```yaml
# UNRESOLVED: no settable parameters documented beyond action params
```

## Events
```yaml
# UNRESOLVED: no unsolicited push/streaming events documented
```

## Macros
```yaml
- id: rigcheck_full_workflow
  label: RigCheck Example Workflow
  description: |
    1. POST cameradiscovery { enabled: true } (optional; executeplan auto-enables
       and pre-enabling reduces initial delay while cameras come online)
    2. POST rigcheck/executeplan (empty body)
    3. Poll GET rigcheck/checkresult until complete (status.message carries
       task progress; Amber/"RigCheck still in progress." means keep polling)
    4. Visually inspect alignment; compare omniCalScore to previous results
    5. POST rigcheck/acceptresult (success) OR POST rigcheck/revertresult (fail)
    6. POST cameradiscovery { enabled: false }
    7. Optionally POST rigcheck/deleteoldresults periodically

- id: rigcheck_failure_retry
  label: RigCheck Failure Recovery
  description: |
    After a Red result (e.g. "Incomplete capture."): POST rigcheck/revertresult
    to return to the fallback Result, fix external issues (interfering light,
    people on stage), then repeat from POST rigcheck/executeplan.
```

## Safety
```yaml
confirmation_required_for:
  - accept_result
  - revert_result
  - delete_old_results
interlocks:
  - type: resource_lock
    description: Camera discovery occupies CPU and network resources on the Director and must be disabled before running a show
# UNRESOLVED: no explicit safety warnings beyond discovery resource note
```

## Notes
- API examples use `http://127.0.0.1` (loopback). Director machine must be reachable from caller.
- OmniCal Score lower = better; RMS errors may fluctuate — compare only omniCalScore.
- Score/error value 10000 is a sentinel shown while a RigCheck is in progress or after failure, not a real measurement.
- `executeplan` automatically enables camera discovery if not already enabled; explicit pre-enable reduces initial delay.
- Example calls use `accept: application/json` and `Content-Type: application/json` headers.
- QuickAlign manual adjustments not exposed via API; requires remote Designer login.
- Discovery must be disabled before show; resource-heavy on Director.
- All POST endpoints except cameradiscovery accept empty JSON body `{}`.
- Requirement for RigCheck workflow: a previously set up OmniCal Plan that is well calibrated and aligned.

<!-- UNRESOLVED: port number, auth scheme, firmware version, and RequestPlansFilter enum values not stated in source. -->

## Provenance

```yaml
source_domains:
  - developer.disguise.one
source_urls:
  - https://developer.disguise.one/api/session/omnical
retrieved_at: 2026-08-31T10:49:55.483Z
last_checked_at: 2026-08-31T11:10:41.561Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-31T11:10:41.561Z
matched_actions: 13
action_count: 13
confidence: medium
summary: "All 13 spec endpoints (URLs, methods, and params) match the refined source one-to-one; transport base_url is verbatim. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "OmniCal QuickAlign adjustments are not exposed via the API per source."
- "no settable parameters documented beyond action params"
- "no unsolicited push/streaming events documented"
- "no explicit safety warnings beyond discovery resource note"
- "port number, auth scheme, firmware version, and RequestPlansFilter enum values not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
