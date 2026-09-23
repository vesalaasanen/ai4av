---
spec_id: admin/resolume-arena
schema_version: ai4av-public-spec-v1
revision: 1
title: "Resolume Arena Control Spec"
manufacturer: Resolume
model_family: "Resolume Arena"
aliases: []
compatible_with:
  manufacturers:
    - Resolume
  models:
    - "Resolume Arena"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - resolume.com
source_urls:
  - https://resolume.com/support/en/websocket-api
retrieved_at: 2026-06-08T11:57:36.022Z
last_checked_at: 2026-09-18T22:18:22.303Z
generated_at: 2026-09-18T22:18:22.303Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "concrete TCP port number for the Webserver/REST/Websocket listener not stated in source"
  - "port number not stated in source"
  - "Webserver/REST/Websocket port not stated in source"
  - "enumerable parameter set lives in the linked REST API reference,"
  - "no multi-step sequences documented in source."
  - "no safety warnings or interlock procedures documented in source."
  - "listener port, firmware compatibility, and the full parameter catalogue are documented outside this document."
verification:
  verdict: verified
  checked_at: 2026-09-18T22:18:22.303Z
  matched_actions: 8
  action_count: 8
  confidence: medium
  summary: "All 8 spec actions (subscribe/unsubscribe/set/get/reset/trigger/post/remove) are documented verbatim in source; /api/v1 path is present. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Resolume Arena Control Spec

## Summary
Resolume Arena is a real-time video mixing and effects application. This spec covers control of Arena via its built-in Webserver & REST API and Websocket API, which together expose a JSON-over-HTTP and JSON-over-Websocket interface for querying composition state, subscribing to parameter updates, and mutating the composition (layers, columns, sources, effects, parameters).

<!-- UNRESOLVED: concrete TCP port number for the Webserver/REST/Websocket listener not stated in source -->

## Transport
```yaml
protocols:
  - http
  - tcp  # Websocket runs over TCP
addressing:
  base_url: /api/v1
  # UNRESOLVED: port number not stated in source
  port: null  # UNRESOLVED: Webserver/REST/Websocket port not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
queryable: true  # inferred from "get" action
powerable: false
routable: false
levelable: false
```

## Actions
```yaml
- id: subscribe_parameter
  label: Subscribe to parameter
  kind: action
  command: '{"action":"subscribe","parameter":"/parameter/by-id/{parameter_id}"}'
  params:
    - name: parameter_id
      type: string
      description: Parameter id from composition object
- id: unsubscribe_parameter
  label: Unsubscribe from parameter
  kind: action
  command: '{"action":"unsubscribe","parameter":"/parameter/by-id/{parameter_id}"}'
  params:
    - name: parameter_id
      type: string
      description: Parameter id currently subscribed
- id: set_parameter
  label: Set parameter value
  kind: action
  command: '{"action":"set","parameter":"/parameter/by-id/{parameter_id}","value":<value>}'
  params:
    - name: parameter_id
      type: string
      description: Parameter id from composition object
    - name: value
      type: string
      description: Value matching the parameter's declared type (string for StringParameter, etc.)
- id: get_parameter
  label: Get parameter value
  kind: query
  command: '{"action":"get","parameter":"/parameter/by-id/{parameter_id}"}'
  params:
    - name: parameter_id
      type: string
      description: Parameter id from composition object
- id: reset_parameter
  label: Reset parameter
  kind: action
  command: '{"action":"reset","parameter":"/parameter/by-id/{parameter_id}"}'
  params:
    - name: parameter_id
      type: string
      description: Parameter id to reset
- id: trigger_parameter
  label: Trigger parameter
  kind: action
  command: '{"action":"trigger","parameter":"/parameter/by-id/{parameter_id}"}'
  params:
    - name: parameter_id
      type: string
      description: Parameter id to trigger
- id: post_path
  label: Post (create) composition object
  kind: action
  command: '{"action":"post","id":"<optional_id>","path":"<path>","body":<optional_body>}'
  params:
    - name: path
      type: string
      description: Swagger path minus /api/v1 (e.g. /composition/layers/add)
    - name: id
      type: string
      description: Optional message id echoed back in response
    - name: body
      type: string
      description: Optional request data depending on action
- id: remove_path
  label: Remove composition object
  kind: action
  command: '{"action":"remove","id":"<optional_id>","path":"<path>"}'
  params:
    - name: path
      type: string
      description: Swagger path minus /api/v1 (e.g. /composition/columns/1)
    - name: id
      type: string
      description: Optional message id echoed back in response
```

## Feedbacks
```yaml
- id: composition_state
  type: object
  description: "Composition state pushed on connect and on structural changes (columns/layers added/removed)."
- id: sources_update
  type: object
  description: "List of available sources, wrapped as {\"type\":\"sources_update\",\"value\":<sources>}."
- id: effects_update
  type: object
  description: "List of available effects, wrapped as {\"type\":\"effects_update\",\"value\":<effects>}."
- id: parameter_subscribed
  type: object
  description: "Confirmation after subscribe action."
- id: parameter_unsubscribed
  type: object
  description: "Confirmation after unsubscribe action."
- id: parameter_get
  type: object
  description: "Response carrying the current value after a get action."
- id: parameter_set
  type: object
  description: "Confirmation after a set action."
- id: parameter_update
  type: object
  description: "Pushed when a subscribed parameter's value changes."
```

## Variables
```yaml
# UNRESOLVED: enumerable parameter set lives in the linked REST API reference,
# not in this Websocket doc. Refer to https://resolume.com/docs/restapi/ for the
# full parameter catalogue (e.g. /composition/columns/{column-index}/name).
```

## Events
```yaml
- id: composition_state_push
  description: Sent immediately on Websocket connect and on structural composition changes.
- id: sources_update_push
  description: Sent when a source is added or removed.
- id: effects_update_push
  description: Sent when an effect is added or removed.
- id: parameter_update_push
  description: Sent for parameters with an active subscription whose value changes.
- id: action_response
  description: Response to action messages (subscribe/unsubscribe/set/get), includes id and error fields.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures documented in source.
```

## Notes
Webserver & REST API must be enabled under Preferences > Webserver ("Enable Webserver & REST API") before any of these endpoints are reachable. The Websocket endpoint reuses the same address and port as the REST API, at path `/api/v1`. The REST API path used by HTTP clients is also rooted at `/api/v1` (e.g. `/api/v1/composition/columns/{column-index}/name`).

Parameter paths use the form `/parameter/by-id/<parameter_id>` where `<parameter_id>` is the id given in the composition object; logical paths mirror the REST API reference without the `/api/v1` prefix and with the parameter name appended. Action verbs (`subscribe`, `unsubscribe`, `set`, `get`, `reset`, `trigger`, `post`, `remove`) are case-sensitive lowercase — `remove` is used in place of `delete` because `delete` is a reserved keyword in JavaScript and C++.

The full per-parameter catalogue (types, allowed values, enum ranges, choice ids like `colorid`) is documented separately at https://resolume.com/docs/restapi/ (Arena) and https://resolume.com/docs/wirerestapi/ (Wire); this spec covers only the transport envelope.

<!-- UNRESOLVED: listener port, firmware compatibility, and the full parameter catalogue are documented outside this document. -->

## Provenance

```yaml
source_domains:
  - resolume.com
source_urls:
  - https://resolume.com/support/en/websocket-api
retrieved_at: 2026-06-08T11:57:36.022Z
last_checked_at: 2026-09-18T22:18:22.303Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-18T22:18:22.303Z
matched_actions: 8
action_count: 8
confidence: medium
summary: "All 8 spec actions (subscribe/unsubscribe/set/get/reset/trigger/post/remove) are documented verbatim in source; /api/v1 path is present. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "concrete TCP port number for the Webserver/REST/Websocket listener not stated in source"
- "port number not stated in source"
- "Webserver/REST/Websocket port not stated in source"
- "enumerable parameter set lives in the linked REST API reference,"
- "no multi-step sequences documented in source."
- "no safety warnings or interlock procedures documented in source."
- "listener port, firmware compatibility, and the full parameter catalogue are documented outside this document."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
