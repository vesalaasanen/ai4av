---
spec_id: admin/christie-phoenix
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie Phoenix Control Spec"
manufacturer: Christie
model_family: Phoenix
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - Phoenix
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-102207-08-christie-lit-man-ref-spyder-commands.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000372-05-christie-e-series-serial-communications.pdf
retrieved_at: 2026-05-04T15:10:58.851Z
last_checked_at: 2026-05-19T17:04:12.030Z
generated_at: 2026-05-19T17:04:12.030Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-19T17:04:12.030Z
  matched_actions: 24
  action_count: 24
  confidence: high
  summary: "All 24 spec actions matched verbatim in source; transport parameters verified; command set complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Christie Phoenix Control Spec

## Summary
Christie Phoenix is a video wall processor/controller using an ASCII-based command/response protocol over TCP. Commands are space-delimited, terminated with carriage return; responses terminated with `>`. Supports layer management, source management, layout recall, treatment application, user management, and node control.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 11135
auth:
  type: credential
  description: Logon command required with username/password before other commands; NotAuthorized returned otherwise
```

## Traits
```yaml
- powerable    # Restart + Shutdown commands present
- queryable    # Multiple Get* query commands present
- routable     # SourceApply, LayerAdd, LayerMove - input/output routing
```

## Actions
```yaml
- id: logon
  label: Logon
  kind: action
  params:
    - name: username
      type: string
      description: Phoenix user account username
    - name: password
      type: string
      description: Phoenix user account password

- id: logoff
  label: Logoff
  kind: action
  params: []

- id: layer_add
  label: Layer Add
  kind: action
  params:
    - name: wall_id
      type: integer
      description: Wall ID to create the new layer on
    - name: source_id
      type: integer
      description: Source ID for the new layer
    - name: x
      type: integer
      description: X position in pixels relative to left edge of wall
    - name: y
      type: integer
      description: Y position in pixels relative to top edge of wall
    - name: width
      type: integer
      description: Width in pixels for the new layer

- id: layer_remove
  label: Layer Remove
  kind: action
  params:
    - name: layer_ids
      type: integer
      description: One or more Layer IDs to remove (repeatable last argument)

- id: layer_move
  label: Layer Move
  kind: action
  params:
    - name: move_type
      type: integer
      description: "0 = Absolute Position, 1 = Offset Position"
    - name: direction
      type: string
      description: "H = Horizontal, V = Vertical, B = Both"
    - name: horizontal
      type: integer
      description: Horizontal offset in pixels (required even if direction is V)
    - name: vertical
      type: integer
      description: Vertical offset in pixels (required even if direction is H)
    - name: layer_ids
      type: integer
      description: One or more Layer IDs to move (repeatable last argument)

- id: layer_reset_aspect
  label: Layer Reset Aspect
  kind: action
  params:
    - name: layer_id
      type: integer
      description: Layer ID

- id: layout_recall
  label: Layout Recall
  kind: action
  params:
    - name: preset_id
      type: integer
      description: Preset ID to recall

- id: source_apply
  label: Source Apply
  kind: action
  params:
    - name: layer_id
      type: integer
      description: Layer ID
    - name: source_id
      type: integer
      description: Source ID

- id: reset_source
  label: Reset Source
  kind: action
  params:
    - name: source_id
      type: integer
      description: Source ID to reset

- id: set_audio_source
  label: Set Audio Source
  kind: action
  params:
    - name: wall_id
      type: integer
      description: Wall ID
    - name: source_id
      type: integer
      description: "Source ID, or -1 for no audio source"

- id: treatment_apply
  label: Treatment Apply
  kind: action
  params:
    - name: treatment_id
      type: integer
      description: Treatment ID
    - name: layer_ids
      type: integer
      description: One or more Layer IDs to apply treatment to (repeatable last argument)

- id: restart
  label: Restart
  kind: action
  params: []

- id: shutdown
  label: Shutdown
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: get_layer
  type: composite
  description: Returns layer info (layer ID, wall ID, source ID, z-index, top, left, width, height)
  query_command: GetLayer <wall_id> <layer_id>

- id: get_layers
  type: list
  description: Returns all layers on a wall
  query_command: GetLayers <wall_id>

- id: get_layouts
  type: list
  description: Returns all layouts (ID and name)
  query_command: GetLayouts

- id: get_source
  type: composite
  description: "Returns source details; response varies by type (RTSP, Still Image, VNC, Remote Desktop, Application, Phoenix DVI Input)"
  query_command: GetSource <source_id>

- id: get_sources
  type: list
  description: Returns all sources (ID and name)
  query_command: GetSources

- id: get_nodes
  type: list
  description: Returns all nodes (serial number and MAC address)
  query_command: GetNodes

- id: get_user
  type: composite
  description: Returns user details (ID, username, name, company, last logon, notes, image, emails, contacts)
  query_command: GetUser <user_id>

- id: get_users
  type: list
  description: Returns all users (ID, username, first name, last name)
  query_command: GetUsers

- id: get_wall
  type: composite
  description: "Returns wall config (ID, name, size, background color/image/alignment/stretch, audio source ID)"
  query_command: GetWall <wall_id>

- id: get_walls
  type: list
  description: Returns all walls (ID and name)
  query_command: GetWalls

- id: get_treatments
  type: list
  description: Returns all treatments (ID and name)
  query_command: GetTreatments

- id: command_response
  type: enum
  values:
    - Success
    - Empty
    - InvalidCommand
    - InvalidArgCount
    - InvalidArgValue
    - Execution
    - NotAuthorized
  description: First response argument is always a result code
```

## Variables
```yaml
# No settable continuous parameters identified - all controls are discrete actions or queries
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification / event push model described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - shutdown
  - restart
interlocks: []
# Restart and Shutdown affect all connected nodes - source explicitly states this scope
```

## Notes
- Commands are not case sensitive.
- Spaces in string arguments must be replaced with `%20`.
- `>` in response strings replaced with `&gt;`.
- Commands terminated with CR; responses terminated with two CRs and `>`.
- Logon required before other commands; `NotAuthorized` returned without valid session.
- LayerAdd arg 5 is width only — height is UNRESOLVED (not specified in source).
- GetWalls response example includes wall dimensions but command description only lists ID and name.

<!-- UNRESOLVED: height parameter for LayerAdd not documented -->
<!-- UNRESOLVED: no date/time, number, or text format specification (TODO in source) -->
<!-- UNRESOLVED: max number of layers per wall not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - christiedigital.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-102207-08-christie-lit-man-ref-spyder-commands.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000372-05-christie-e-series-serial-communications.pdf
retrieved_at: 2026-05-04T15:10:58.851Z
last_checked_at: 2026-05-19T17:04:12.030Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-19T17:04:12.030Z
matched_actions: 24
action_count: 24
confidence: high
summary: "All 24 spec actions matched verbatim in source; transport parameters verified; command set complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
