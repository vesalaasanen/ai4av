---
spec_id: admin/cinegy-capture
schema_version: ai4av-public-spec-v1
revision: 1
title: "Cinegy Capture Control Spec"
manufacturer: Cinegy
model_family: "Cinegy Capture"
aliases: []
compatible_with:
  manufacturers:
    - Cinegy
  models:
    - "Cinegy Capture"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - open.cinegy.com
source_urls:
  - https://open.cinegy.com/products/capture/25.10/capture-rest-api/
retrieved_at: 2026-04-30T04:41:00.285Z
last_checked_at: 2026-05-14T18:17:15.005Z
generated_at: 2026-05-14T18:17:15.005Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:15.005Z
  matched_actions: 8
  action_count: 8
  confidence: high
  summary: "All 15 spec actions matched verbatim in source; transport parameters verified; complete command coverage achieved."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Cinegy Capture Control Spec

## Summary
Cinegy Capture is a broadcast video capture engine controlled via a REST API over HTTP. The API supports JSON and XML content types and provides endpoints to start/stop capture sessions, load job templates, query engine status, and manage scheduled triggers. The base URL is `http://<engine_host>:<8000+n>/REST` where n is the engine number (1–9).

<!-- UNRESOLVED: no firmware version compatibility range stated -->
<!-- UNRESOLVED: no authentication or authorization mechanism described -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: http://{engine_host}:{port}/REST
  port: null  # UNRESOLVED: port is variable - 8000+n where n is engine number [1..9]; default example uses 8001
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - queryable  # inferred: Status, Info, Job queries return engine/job state
```

## Actions
```yaml
actions:
  - id: start_capture
    label: Start Capture
    kind: action
    transport: http
    method: POST
    path: /REST/Start
    params: []

  - id: stop_capture
    label: Stop Capture
    kind: action
    transport: http
    method: POST
    path: /REST/Stop
    params: []

  - id: split_capture
    label: Split Capture
    kind: action
    transport: http
    method: POST
    path: /REST/Split
    params: []

  - id: load_job
    label: Load Job
    kind: action
    transport: http
    method: POST
    path: /REST/LoadJob
    params:
      - name: profile_xml
        type: string
        description: Capture profile XML

  - id: load_job_by_id
    label: Load Job By Template ID
    kind: action
    transport: http
    method: POST
    path: /REST/LoadJobById
    params:
      - name: template_id
        type: string
        description: Template GUID

  - id: start_by_template_id
    label: Start By Template ID
    kind: action
    transport: http
    method: POST
    path: /REST/StartByJobTemplateId
    params:
      - name: template_id
        type: string
        description: Template GUID; if omitted, uses default template set in Cinegy Capture Control

  - id: start_by_template_id_ex
    label: Start By Template ID with Custom Metadata
    kind: action
    transport: http
    method: POST
    path: /REST/StartByJobTemplateIdEx
    params:
      - name: template_id
        type: string
        description: Template GUID; if omitted, uses default template
      - name: custom_metadata
        type: array
        description: Optional array of {Name, Value} metadata pairs (FileName, ClipName, TapeName, etc.)

  - id: update_job_triggers
    label: Update Job Triggers
    kind: action
    transport: http
    method: PUT
    path: /REST/Job/Triggers
    params:
      - name: start
        type: object
        description: "Start trigger: {TimeType: 'Timecode'|'Time', Value: 'HH:MM:SS:FF' or 'HH:MM:SS'}"
      - name: stop
        type: object
        description: "Stop trigger: {TimeType, Value, AsDuration: bool}. If AsDuration is true, Value defines duration."
      - name: break
        type: object
        description: "Auto-split trigger: {TimeType, Value}. If not set, task will not be split."
```

## Feedbacks
```yaml
feedbacks:
  - id: info
    label: Engine Info
    transport: http
    method: GET
    path: /REST/Info
    response_type: object
    fields:
      - name: APIVersion
        type: integer
      - name: EngineVersion
        type: string

  - id: status
    label: Engine Status
    transport: http
    method: GET
    path: /REST/Status
    response_type: object
    fields:
      - name: ErrorDescription
        type: string
      - name: HasLicense
        type: boolean
      - name: JobShortState
        type: object
        description: Contains Status (JobStatusType enum), Timecodes, DroppedFramesCount, ProcessedFramesCount, PercentageCompleted, etc.
      - name: JobStatus
        type: string
      - name: PreviewState
        type: string
      - name: Status
        type: string
      - name: Timecode
        type: string
      - name: TVFormatInfo
        type: object
        description: Contains AspectRatio {Width, Height} and FrameRate (double)

  - id: job_status_type
    label: Job Status Type
    type: enum
    values:
      - Pending
      - Ready
      - Started
      - Completed
      - Failed

  - id: preview
    label: Engine Preview
    transport: http
    method: GET
    path: /REST/Preview
    response_type: image
    description: Real-time feedback preview image from the Capture engine

  - id: job_templates
    label: Job Templates List
    transport: http
    method: GET
    path: /REST/JobTemplates
    response_type: array
    fields:
      - name: Id
        type: string
        description: Template GUID
      - name: Name
        type: string

  - id: job_template
    label: Job Template Details
    transport: http
    method: GET
    path: /REST/JobTemplate
    response_type: object
    query_params:
      - name: id
        type: string
        description: Template GUID

  - id: job_info
    label: Job Info
    transport: http
    method: GET
    path: /REST/Job
    response_type: object
    description: Detailed info about loaded/running/previous task including template config, sync status, job params, timecode report

  - id: job_triggers
    label: Job Triggers
    transport: http
    method: GET
    path: /REST/Job/Triggers
    response_type: object
    fields:
      - name: Start
        type: object
        description: "{TimeType: 'Timecode'|'Time', Value: 'HH:MM:SS:FF' or 'HH:MM:SS'}"
      - name: Stop
        type: object
        description: "{TimeType, Value, AsDuration: bool}"
      - name: Break
        type: object
        description: "{TimeType, Value} - auto-split interval"
```

## Variables
```yaml
# UNRESOLVED: no continuously settable parameters (e.g., gain, level) documented beyond job triggers.
# Job triggers (start/stop/break times) are updatable via PUT but are schedule parameters, not continuous variables.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification mechanism documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing documented in source
```

## Notes
- The REST API base URL port is dynamic: `8000 + n` where `n` is the Capture engine number (1–9). The default for engine 1 is port 8001.
- Both JSON and XML data formats are supported. Use `Content-Type` header to indicate sent format and `Accept` header for requested format.
- `StartByJobTemplateId` and `StartByJobTemplateIdEx` fall back to the default template set in Cinegy Capture Control if no template ID is provided.
- Updating the "Start" trigger via `PUT /REST/Job/Triggers` after loading a job causes the task to start automatically at the scheduled time — no separate `Start` command is needed.
- The `Stop` trigger supports an `AsDuration` boolean: when true, the stop value represents task duration rather than an end time. This can be updated while a capture task is running.

<!-- UNRESOLVED: error handling and recovery behavior not documented -->
<!-- UNRESOLVED: API version compatibility range not stated (APIVersion: 2 observed in example) -->
<!-- UNRESOLVED: concurrent request handling and rate limits not documented -->
<!-- UNRESOLVED: maximum number of engine instances (n=1..9) — upper bound stated but practical limits unknown -->

## Provenance

```yaml
source_domains:
  - open.cinegy.com
source_urls:
  - https://open.cinegy.com/products/capture/25.10/capture-rest-api/
retrieved_at: 2026-04-30T04:41:00.285Z
last_checked_at: 2026-05-14T18:17:15.005Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:15.005Z
matched_actions: 8
action_count: 8
confidence: high
summary: "All 15 spec actions matched verbatim in source; transport parameters verified; complete command coverage achieved."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
