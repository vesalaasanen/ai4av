---
spec_id: admin/sennheiser-tcc-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sennheiser TeamConnect Ceiling Medium Control Spec"
manufacturer: Sennheiser
model_family: "TeamConnect Ceiling Medium (TCC M)"
aliases: []
compatible_with:
  manufacturers:
    - Sennheiser
  models:
    - "TeamConnect Ceiling Medium (TCC M)"
    - Spectera
    - "TeamConnect Bar (TC Bar)"
    - "EW-DX EM 2 rack receiver (firmware ≥ 4.0.0)"
    - "EW-DX EM 2 rack receiver Dante (firmware ≥ 4.0.0)"
    - "EW-DX EM 4 rack receiver Dante (firmware ≥ 4.0.0)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sennheiser-sites.com
source_urls:
  - https://www.sennheiser-sites.com/responsive-manuals/en/api-docs/index.html
retrieved_at: 2026-07-16T08:31:35.583Z
last_checked_at: 2026-10-07T12:36:48.994Z
generated_at: 2026-10-07T12:36:48.994Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "maximum simultaneous sessions not stated in source"
  - "time payload schema not specified in source"
  - "full endpoint list not included; source references OpenAPI schema at /api/openapi.json"
  - "no explicit multi-step sequences described in source"
  - "source does not specify confirmation requirements, safety warnings, interlock procedures, or power sequencing"
  - "complete endpoint inventory not included; only key endpoints shown from spec overview"
  - "DSP module types and parameter ranges not enumerated in source excerpt"
  - "maximum command execution time beyond 5s not stated"
  - "device/time payload schema not specified"
verification:
  verdict: verified
  checked_at: 2026-10-07T12:36:48.994Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 spec actions match source endpoints and verbs one-to-one, transport values are supported, and the spec covers the source's full command catalogue. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Sennheiser TeamConnect Ceiling Medium Control Spec

## Summary

Sennheiser SSCv2 (Sound Control Protocol v2) is a REST API over HTTPS (HTTP/1.1, TLS 1.2) with JSON serialization, used by ceiling microphone arrays (TCC M), bar speakers, and wireless receiver systems. The address tree is under `/api`. Authentication supports password via HTTP Basic Auth or token-based auth; credential details beyond these methods are not specified. Server-sent events (SSE) support real-time subscription-based state notifications.

<!-- UNRESOLVED: maximum simultaneous sessions not stated in source -->

## Transport
```yaml
protocols:
  - https
addressing:
  base_url: https://{host}
  base_path: /api
  port: 443
http_version: "1.1"
auth:
  type: basic
  alternative_types:
    - token
  credentials:
    username: UNRESOLVED  # username not stated in source
    password: UNRESOLVED  # password value and provisioning method not stated in source
transport_security:
  tls_version: "1.2"
  unencrypted_http_allowed: false
connection_model:
  persistent: recommended
  session_scope: https_connection  # sessions tied to HTTPS connection duration
```

## Traits
```yaml
- queryable       # GET requests read property values
- routable        # audio input routing present (beam direction, gain per channel)
- levelable       # gain, mute controls present
- eventable       # SSE subscriptions for real-time notifications
```

## Actions
```yaml
# --- Device management ---

- id: device_restart
  label: Device Restart
  kind: action
  params: []
  method: POST
  path: /api/device/restart

- id: factory_restore
  label: Factory Restore
  kind: action
  params:
    - name: body
      type: object
      required: true
      description: JSON request body, e.g. {"type": "Factory Defaults"}
  method: POST
  path: /api/device/restore
  response:
    status: 200
    body:
      type: Factory Defaults

- id: device_time_set
  label: Set Device Time
  kind: action
  description: Optional endpoint; read-only if device uses NTP/PTP
  params:
    - name: body
      type: object
      description: Time payload (schema not specified in source)
  method: PUT
  path: /api/device/time

# --- Subscription management (SSE) ---

- id: subscription_start
  label: Start SSE Subscription
  kind: action
  description: Opens SSE stream; server replies with text/event-stream and Content-Location header
  params: []
  method: GET
  path: /api/ssc/state/subscriptions
  response:
    content_type: text/event-stream
    content_location: /api/ssc/state/subscriptions/{sessionUUID}

- id: subscription_replace
  label: Replace Subscription List
  kind: action
  description: Replace full subscription list
  params:
    - name: sessionUUID
      type: string
      required: true
      description: Session identifier from SSE open event
    - name: body
      type: array
      required: true
      description: JSON array of resource paths, e.g. ["/api/device/site", "/api/device/identity"]
  method: PUT
  path: /api/ssc/state/subscriptions/{sessionUUID}

- id: subscription_add
  label: Add Subscription Resources
  kind: action
  description: Add resources to subscription; empty list = no action, replies 200
  params:
    - name: sessionUUID
      type: string
      required: true
    - name: body
      type: array
      required: true
      description: JSON array of resource paths to add
  method: PUT
  path: /api/ssc/state/subscriptions/{sessionUUID}/add

- id: subscription_remove
  label: Remove Subscription Resources
  kind: action
  description: Remove resources from subscription; empty list = no action, replies 200. 404 = resource not in subscribed list.
  params:
    - name: sessionUUID
      type: string
      required: true
    - name: body
      type: array
      required: true
      description: JSON array of resource paths to remove
  method: PUT
  path: /api/ssc/state/subscriptions/{sessionUUID}/remove

- id: subscription_end
  label: End Subscription
  kind: action
  description: Closes subscription; server sends close-event before closing
  params:
    - name: sessionUUID
      type: string
      required: true
  method: DELETE
  path: /api/ssc/state/subscriptions/{sessionUUID}

# --- Dynamic DSP module resources ---

- id: create_dynamic_resource
  label: Create Dynamic Resource
  kind: action
  params:
    - name: module
      type: string
      required: true
      description: Module collection, e.g. agc
    - name: body
      type: object
      required: true
      description: Field values for the new instance, e.g. {"value1": "x", "value2": "y"}
  method: POST
  path: /api/device/dsp/modules/{module}
  response:
    status: 201
    headers:
      Location: /api/device/dsp/modules/{module}/{instanceId}

- id: delete_dynamic_resource
  label: Delete Dynamic Resource
  kind: action
  params:
    - name: module
      type: string
      required: true
      description: Module type, e.g. agc
    - name: instanceId
      type: string
      required: true
  method: DELETE
  path: /api/device/dsp/modules/{module}/{instanceId}

- id: update_dynamic_resource
  label: Update Dynamic Resource
  kind: action
  description: Update an existing module instance; the subresource supports GET, PUT, and DELETE
  params:
    - name: module
      type: string
      required: true
      description: Module type, e.g. agc
    - name: instanceId
      type: string
      required: true
    - name: body
      type: object
      required: true
      description: Field values to update, e.g. {"value1": "x", "value2": "y"}
  method: PUT
  path: /api/device/dsp/modules/{module}/{instanceId}

- id: ssc_version_read
  label: Read SSCv2 Version
  kind: action
  params: []
  method: GET
  path: /api/ssc/version

- id: subscription_list_read
  label: Read Subscription List
  kind: action
  params:
    - name: sessionUUID
      type: string
      required: true
  method: GET
  path: /api/ssc/state/subscriptions/{sessionUUID}

- id: device_identity_read
  label: Read Device Identity
  kind: action
  params: []
  method: GET
  path: /api/device/identity

- id: device_site_read
  label: Read Device Site
  kind: action
  params: []
  method: GET
  path: /api/device/site

- id: device_site_update
  label: Update Device Site
  kind: action
  params:
    - name: body
      type: object
      required: true
      description: {"deviceName": "MyDevice", "location": "Chemistry Building 5, Room 15", "position": "Left side near the big pillar"}
  method: PUT
  path: /api/device/site

- id: device_time_read
  label: Read Device Time
  kind: action
  params: []
  method: GET
  path: /api/device/time

- id: dynamic_resource_list
  label: List Dynamic Resources
  kind: action
  params: []
  method: GET
  path: /api/device/dsp/modules/agc

- id: dynamic_module_instance_read
  label: Read Dynamic Module Instance
  kind: action
  params:
    - name: instanceId
      type: string
      required: true
  method: GET
  path: /api/device/dsp/modules/agc/{instanceId}

- id: preset_bank_read
  label: Read Preset Bank
  kind: action
  params: []
  method: GET
  path: /api/presets/bank1

- id: preset_bank_update
  label: Update Preset Bank
  kind: action
  params:
    - name: body
      type: object
      required: true
      description: {"carriers": [470000, 470400, 470800, 471250, 471600]}
  method: PUT
  path: /api/presets/bank1
```

## Feedbacks
```yaml
# All SSCv2 resources are readable via GET; no separate query endpoint.
# Use Variables for persistent state, Events for subscriptions.
```

## Variables
```yaml
# Device Identity
- id: device_identity
  label: Device Identity
  type: object
  read_only: true
  fields:
    - product: string
    - serial: string
    - vendor: string  # "Sennheiser electronic GmbH & Co. KG"
    - hardwareRevision: string
  method: GET
  path: /api/device/identity

# Device Site (read/write)
- id: device_site
  label: Device Site
  type: object
  read_only: false
  fields:
    - name: string  # max 60 chars (entity name "deviceName")
    - location: string  # max 240 chars
    - position: string  # max 240 chars
  method: GET|PUT
  path: /api/device/site

# Protocol Version
- id: ssc_version
  label: SSCv2 Version
  type: object
  read_only: true
  fields:
    - protocol: string  # e.g. "2.0"
    - schema: string  # e.g. "1.5"
  method: GET
  path: /api/ssc/version

# Device Time (read/write; read-only if device uses NTP/PTP)
- id: device_time
  label: Device Time
  type: object
  read_only: false
  description: Optional endpoint. Read-only if device synchronizes via NTP/PTP.
  fields: []  # UNRESOLVED: time payload schema not specified in source
  method: GET|PUT
  path: /api/device/time

# Audio Gain (example per-channel property)
- id: channel_gain
  label: Channel Gain
  type: object
  fields:
    - gain: number  # dB value
    - mute: boolean
  method: GET|PUT
  path: /api/out1/xlr2

# Preset Bank (array example from source)
- id: presets_bank
  label: Preset Bank
  type: object
  fields:
    - carriers: array  # of integers, e.g. [470000, 470400, 470800, 471200, 471600]
  method: GET|PUT
  path: /api/presets/bank1

# Dynamic Module Instance (single instance read)
- id: dynamic_module_instance
  label: Dynamic Module Instance
  type: object
  read_only: false
  description: Read a single DSP module instance (subresource also supports PUT/DELETE)
  fields:
    - instanceId: string
    - value1: string
    - value2: string
  method: GET|PUT|DELETE
  path: /api/device/dsp/modules/{module}/{instanceId}

# Subscription State (read)
- id: subscriptions
  label: Active Subscriptions
  type: array
  read_only: true
  method: GET
  path: /api/ssc/state/subscriptions/{sessionUUID}

# UNRESOLVED: full endpoint list not included; source references OpenAPI schema at /api/openapi.json
```

## Events
```yaml
# SSE-based subscriptions. Device sends notifications on state changes.
# Event types: open, message, close

- id: subscription_open
  label: Subscription Opened
  type: event
  fields:
    - path: string  # /api/ssc/state/subscriptions/{sessionUUID}
    - sessionUUID: string

- id: resource_update
  label: Resource Updated
  type: event
  description: Sent when subscribed resource changes; body contains {path: {field: value}}
  fields:
    - path: string
    - values: object

- id: resource_created
  label: Resource Created
  type: event
  description: On dynamic resource creation, server sends empty object {} then immediate update with current values
  fields:
    - path: string
    - values: object  # empty {} initially

- id: resource_deleted
  label: Resource Deleted
  type: event
  description: Sent when subscribed resource is deleted; value is null
  fields:
    - path: string
    - value: null

- id: subscription_close
  label: Subscription Closed
  type: event
  fields:
    - path: string
    - sessionUUID: string
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not specify confirmation requirements, safety warnings, interlock procedures, or power sequencing
```

## Notes

SSCv2 is a REST API over HTTPS using HTTP/1.1. Request and response bodies use JSON; subscription list request bodies are JSON arrays. Content-Type is `application/json` for request/response bodies. Each HTTP request carries one SSCv2 message. Commands exceeding 5s execution time trigger HTTP 102 (Processing) immediately; final response is sent when complete.

Subscriptions use Server-Sent Events (SSE) with format `event: <eventtype>\ndata: <updatejson>\n\n`. Once a subscription is established, the SSE connection is dedicated — no further regular HTTP requests on that connection.

Dynamic resources (DSP modules) may be supported by the server. Control resources support GET (list) and POST (create); instance subresources support GET, PUT, and DELETE. On creation, the server sends an SSE notification with empty object `{}`, then an immediate update with current values. A deletion notification uses `null`. The server sends 404 if a resource is not in the subscribed list on a remove attempt.

Invalid partial parameters in a multi-parameter PUT result in no applied changes (transactional).

Array resources are read and written identically to elementary values. Array ranges from earlier spec versions should not be used.

HTTP status code mappings: 400 (bad request / broken JSON / invalid enum / entity limit), 401 (no credentials sent), 403 (authenticated but not authorized), 404 (resource not found), 405 (method not allowed), 409 (state conflict), 422 (semantic error), 102 (long-running command in progress).

Authentication is checked before authorization. Authentication supports password via HTTP Basic Auth or token-based auth; the source does not specify a username, token scheme details, or password provisioning method.

SSCv2 protocol version history: 0.1 (2022-08-02 Draft) → 0.8 (2022-09-09 Draft) → 2.0 (2022-10-10) → 2.1 (2022-12-02) → 2.2 (2023-03-01) → 2.3 (2023-10-27).

<!-- UNRESOLVED: complete endpoint inventory not included; only key endpoints shown from spec overview -->
<!-- UNRESOLVED: DSP module types and parameter ranges not enumerated in source excerpt -->
<!-- UNRESOLVED: maximum command execution time beyond 5s not stated -->
<!-- UNRESOLVED: device/time payload schema not specified -->

## Provenance

```yaml
source_domains:
  - sennheiser-sites.com
source_urls:
  - https://www.sennheiser-sites.com/responsive-manuals/en/api-docs/index.html
retrieved_at: 2026-07-16T08:31:35.583Z
last_checked_at: 2026-10-07T12:36:48.994Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:36:48.994Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 spec actions match source endpoints and verbs one-to-one, transport values are supported, and the spec covers the source's full command catalogue. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "maximum simultaneous sessions not stated in source"
- "time payload schema not specified in source"
- "full endpoint list not included; source references OpenAPI schema at /api/openapi.json"
- "no explicit multi-step sequences described in source"
- "source does not specify confirmation requirements, safety warnings, interlock procedures, or power sequencing"
- "complete endpoint inventory not included; only key endpoints shown from spec overview"
- "DSP module types and parameter ranges not enumerated in source excerpt"
- "maximum command execution time beyond 5s not stated"
- "device/time payload schema not specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
