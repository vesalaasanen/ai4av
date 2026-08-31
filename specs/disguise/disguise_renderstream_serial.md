---
spec_id: admin/disguise-renderstream
schema_version: ai4av-public-spec-v1
revision: 1
title: "disguise RenderStream Control Spec"
manufacturer: disguise
model_family: RenderStream
aliases: []
compatible_with:
  manufacturers:
    - disguise
  models:
    - RenderStream
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-08-31T11:10:43.154Z
last_checked_at: 2026-08-31T11:10:43.154Z
generated_at: 2026-08-31T11:10:43.154Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input metadata declared known protocol \"RS-232C\", but the source document contains no serial content — it documents an HTTP REST API only. Serial transport cannot be populated from this source."
  - "HTTP host, port, and authentication procedure not stated in source."
  - "port number not stated in source"
  - "concrete value ranges for enum-like fields (e.g. workload instance state, stream statusString) not stated in source - schemas contain empty placeholder values only"
  - "no settable parameter endpoints documented in source; all POST bodies are operation requests, not parameter writes"
  - "no unsolicited notifications documented in source"
  - "no multi-step sequences documented in source"
  - "no safety warnings or interlock procedures stated in source."
  - "HTTP scheme, host, and port not stated in source"
  - "authentication requirements not stated in source"
  - "status code enumerations and error semantics not stated in source"
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-08-31T11:10:43.154Z
  matched_actions: 11
  action_count: 11
  confidence: medium
  summary: "All 11 spec actions match the 11 source endpoints verbatim; transport path prefix appears in source; no extras. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-31
---

# disguise RenderStream Control Spec

## Summary
REST/HTTP API for disguise RenderStream, exposing control of RenderStream layers, workloads, assigners, pools, and machine failover via 11 GET/POST endpoints under `/api/session/renderstream/`. All operations exchange JSON documents containing a protobuf-style `status` object (`code`, `message`, `details`).

<!-- UNRESOLVED: input metadata declared known protocol "RS-232C", but the source document contains no serial content — it documents an HTTP REST API only. Serial transport cannot be populated from this source. -->
<!-- UNRESOLVED: HTTP host, port, and authentication procedure not stated in source. -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "/api/session/renderstream"  # path prefix stated in source; scheme/host/port not stated
  port: null  # UNRESOLVED: port number not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - queryable       (GET endpoints returning assigners, layers, layer config, layer status, pools)
traits:
  - queryable
```

## Actions
```yaml
# Command strings copied verbatim from source (source writes method and path with no space).
- id: get_assigners
  label: Get Assigners
  kind: query
  command: "GET/api/session/renderstream/assigners"
  params: []

- id: failover_machine
  label: Failover Machine
  kind: action
  command: "POST/api/session/renderstream/failover"
  params:
    - name: machine_uid
      type: string
      description: UID of the machine to fail over (request body field machine.uid)
    - name: machine_name
      type: string
      description: Name of the machine to fail over (request body field machine.name)

- id: failover_pool
  label: Failover Pool
  kind: action
  command: "POST/api/session/renderstream/failoverpool"
  params:
    - name: layer_uid
      type: string
      description: UID of the layer whose cluster pool is updated and workload restarted (request body field layer.uid)
    - name: layer_name
      type: string
      description: Name of the layer (request body field layer.name)

- id: get_layer_config
  label: Get Layer Config
  kind: query
  command: "GET/api/session/renderstream/layerconfig?uid={uid}&name={name}"
  params:
    - name: uid
      type: integer
      description: Layer UID (uint64 query param)
    - name: name
      type: string
      description: Layer name (query param)

- id: get_layers
  label: Get Layers
  kind: query
  command: "GET/api/session/renderstream/layers"
  params: []

- id: get_layer_status
  label: Get Layer Status
  kind: query
  command: "GET/api/session/renderstream/layerstatus?uid={uid}&name={name}"
  params:
    - name: uid
      type: integer
      description: Layer UID (uint64 query param)
    - name: name
      type: string
      description: Layer name (query param)

- id: get_pools
  label: Get Pools
  kind: query
  command: "GET/api/session/renderstream/pools"
  params: []

- id: restart_layers
  label: Restart Layers
  kind: action
  command: "POST/api/session/renderstream/restartlayers"
  params:
    - name: layers
      type: array
      description: Array of layer objects, each with uid (string) and name (string), identifying the layers whose workloads are restarted

- id: start_layers
  label: Start Layers
  kind: action
  command: "POST/api/session/renderstream/startlayers"
  params:
    - name: layers
      type: array
      description: Array of layer objects, each with uid (string) and name (string), identifying the layers whose workloads are started

- id: stop_layers
  label: Stop Layers
  kind: action
  command: "POST/api/session/renderstream/stoplayers"
  params:
    - name: layers
      type: array
      description: Array of layer objects, each with uid (string) and name (string), identifying the layers whose workloads are stopped

- id: sync_layers
  label: Sync Layers
  kind: action
  command: "POST/api/session/renderstream/synclayers"
  params:
    - name: layers
      type: array
      description: Array of layer objects, each with uid (string) and name (string), identifying the layers whose workloads are synced
```

## Feedbacks
```yaml
# Query-response observations; source shows response schemas only (empty placeholder values).
- id: assigners_list
  type: object
  description: GET assigners result - array of assigners with uid, name, transport (type/format/bitDepth), alpha, overlapPixels, paddingPixels, preferredNetwork (ip/name)

- id: layers_list
  type: object
  description: GET layers result - array of layers with uid and name

- id: layer_config
  type: object
  description: GET layerconfig result - framerateFractionDivisor, asset (uid/name), pool (uid/name), channelMappings (channel, mapping, assigner), defaultAssigner

- id: layer_status
  type: object
  description: GET layerstatus result - reference.tNow, workload instances (machineUid, machineName, state, healthMessage, healthDetails), streams (sourceMachine, receiverMachine, subscription status, statusString), assetErrors

- id: pools_list
  type: object
  description: GET pools result - array of pools with uid, name, machines[] and understudies[] (each with preferredSyncAdapter and network adapters)

- id: api_status
  type: object
  description: status object present on every response - code (integer), message (string), details[] (type_url, value)

# UNRESOLVED: concrete value ranges for enum-like fields (e.g. workload instance state, stream statusString) not stated in source - schemas contain empty placeholder values only
```

## Variables
```yaml
# UNRESOLVED: no settable parameter endpoints documented in source; all POST bodies are operation requests, not parameter writes
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source.
# Note: failover and failoverpool restart workloads, but no safety implications are stated in source.
```

## Notes
- Source is an HTTP REST API reference ("RENDERSTREAM API") with 11 endpoints; despite input metadata declaring RS-232C, no serial protocol content exists in this source.
- Method+path strings are written verbatim as in source, e.g. `GET/api/session/renderstream/assigners` (no space between method and path).
- `layerconfig` and `layerstatus` accept identifying query params `uid` (uint64) and `name` (string); selection semantics (uid vs name precedence) not stated.
- Layer-targeting POSTs (`restartlayers`, `startlayers`, `stoplayers`, `synclayers`) share an identical request shape: `{"layers": [{"uid": "", "name": ""}]}`.
- Responses use a protobuf-style `status` wrapper (`code`/`message`/`details` with `type_url`/`value`); success/failure code values not stated.
- All example field values in the source are empty placeholders — the document defines schema shape only.

<!-- UNRESOLVED: HTTP scheme, host, and port not stated in source -->
<!-- UNRESOLVED: authentication requirements not stated in source -->
<!-- UNRESOLVED: status code enumerations and error semantics not stated in source -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-08-31T11:10:43.154Z
last_checked_at: 2026-08-31T11:10:43.154Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-31T11:10:43.154Z
matched_actions: 11
action_count: 11
confidence: medium
summary: "All 11 spec actions match the 11 source endpoints verbatim; transport path prefix appears in source; no extras. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input metadata declared known protocol \"RS-232C\", but the source document contains no serial content — it documents an HTTP REST API only. Serial transport cannot be populated from this source."
- "HTTP host, port, and authentication procedure not stated in source."
- "port number not stated in source"
- "concrete value ranges for enum-like fields (e.g. workload instance state, stream statusString) not stated in source - schemas contain empty placeholder values only"
- "no settable parameter endpoints documented in source; all POST bodies are operation requests, not parameter writes"
- "no unsolicited notifications documented in source"
- "no multi-step sequences documented in source"
- "no safety warnings or interlock procedures stated in source."
- "HTTP scheme, host, and port not stated in source"
- "authentication requirements not stated in source"
- "status code enumerations and error semantics not stated in source"
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
