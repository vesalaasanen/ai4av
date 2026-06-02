---
spec_id: admin/hubitat-maker-api
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hubitat Maker API Control Spec"
manufacturer: Hubitat
model_family: "Hubitat Elevation Hub"
aliases: []
compatible_with:
  manufacturers:
    - Hubitat
  models:
    - "Hubitat Elevation Hub"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs2.hubitat.com
source_urls:
  - https://docs2.hubitat.com/en/apps/maker-api
retrieved_at: 2026-04-30T04:31:15.212Z
last_checked_at: 2026-06-02T22:08:09.641Z
generated_at: 2026-06-02T22:08:09.641Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific sensor device models not documented — this spec covers the hub API platform itself"
  - "no explicit multi-step macros documented in source"
  - "no safety warnings or interlock procedures in source"
  - "specific device models not listed — only generic device types (Switch, Dimmer, etc.) via capabilities array"
  - "port number not explicitly stated — defaults to HTTP port 80 or HTTPS port 443 on the hub"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:08:09.641Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "All 12 spec actions traced to source (dip-safe re-verify). (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Hubitat Maker API Control Spec

## Summary
Hubitat Elevation hub REST API providing HTTP access to authorized devices, hub variables, rooms, modes, and the Hubitat Safety Monitor (HSM). Supports both local (LAN) and cloud-accessible endpoints with token-based authentication.

<!-- UNRESOLVED: specific sensor device models not documented — this spec covers the hub API platform itself -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://[hub_ip_address]/apps/api/[app_id]"
auth:
  type: token  # access_token passed as query parameter
  token_location: query_param
  token_param_name: access_token
```

## Traits
```yaml
- queryable  # inferred: attribute query endpoints and polling endpoints present
- routable   # inferred: device command endpoints allow controlling device state
```

## Actions
```yaml
- id: device_command
  label: Send Device Command
  kind: action
  params:
    - name: device_id
      type: integer
      description: Device ID
    - name: command
      type: string
      description: Command name (e.g., on, off, setLevel)
    - name: secondary_value
      type: string
      description: Optional secondary parameter (e.g., level percentage)
      required: false

- id: set_device_label
  label: Set Device Label
  kind: action
  params:
    - name: device_id
      type: integer
      description: Device ID
    - name: label
      type: string
      description: New device label (URL-encoded)

- id: set_device_driver
  label: Set Device Driver
  kind: action
  params:
    - name: device_id
      type: integer
      description: Device ID
    - name: namespace
      type: string
      description: Driver namespace
    - name: name
      type: string
      description: Driver name

- id: set_hub_mode
  label: Set Hub Mode
  kind: action
  params:
    - name: mode_id
      type: integer
      description: Numeric mode ID

- id: set_hsm_status
  label: Set HSM Status
  kind: action
  params:
    - name: value
      type: string
      description: HSM status command (e.g., armAway, disarm)

- id: set_hub_variable
  label: Set Hub Variable
  kind: action
  params:
    - name: variable_name
      type: string
      description: Variable name
    - name: value
      type: string
      description: New value

- id: create_room
  label: Create Room
  kind: action
  params:
    - name: name
      type: string
      description: Room name
    - name: device_ids
      type: string
      description: Comma-separated device IDs

- id: update_room
  label: Update Room
  kind: action
  params:
    - name: room_id
      type: integer
      description: Room ID
    - name: name
      type: string
      description: New room name
    - name: device_ids
      type: string
      description: Comma-separated device IDs

- id: delete_room
  label: Delete Room
  kind: action
  params:
    - name: room_id
      type: integer
      description: Room ID

- id: select_room
  label: Select Room
  kind: action
  params:
    - name: room_id
      type: integer
      description: Room ID

- id: set_post_url
  label: Set POST URL for Events
  kind: action
  params:
    - name: url
      type: string
      description: URL to receive event POSTs (URL-encoded)

- id: clear_post_url
  label: Clear POST URL
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: device_list
  type: array
  description: List of authorized devices with id, name, label

- id: device_details
  type: object
  description: Full device info including capabilities, attributes, commands

- id: device_events
  type: array
  description: Recent events for a device

- id: device_commands
  type: array
  description: Available commands for a device

- id: device_attribute
  type: object
  description: Current attribute value (id, attribute, value)

- id: room_list
  type: array
  description: List of all rooms

- id: room_details
  type: object
  description: Room details including device IDs

- id: hub_variable
  type: object
  description: Hub variable info (name, value, type)

- id: hub_variables_list
  type: array
  description: All hub variables

- id: hub_mode
  type: string
  description: Current hub mode

- id: hsm_status
  type: string
  description: Current HSM status
```

## Variables
```yaml
# Hub variables are user-defined stored values accessible via the API
- id: hub_variable
  type: string
  description: User-defined hub variable (name, value, type)
```

## Events
```yaml
# Maker API can POST events to a configured URL when device state changes
- id: device_event
  type: object
  description: Device state change event
  properties:
    - name: name
      type: string
    - name: value
      type: string
    - name: displayName
      type: string
    - name: deviceId
      type: integer
    - name: descriptionText
      type: string
    - name: unit
      type: string
    - name: data
      type: object
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
The access token provides full control over all authorized devices — treat it as sensitive credentials similar to username/password. Maker API supports extended commands beyond standard device commands (e.g., setColor with HSB/hex formats). There is a limited subset of allowed commands enforced by the hub; commands returned in device lists may not all be functional via the API.

<!-- UNRESOLVED: specific device models not listed — only generic device types (Switch, Dimmer, etc.) via capabilities array -->
<!-- UNRESOLVED: port number not explicitly stated — defaults to HTTP port 80 or HTTPS port 443 on the hub -->

## Provenance

```yaml
source_domains:
  - docs2.hubitat.com
source_urls:
  - https://docs2.hubitat.com/en/apps/maker-api
retrieved_at: 2026-04-30T04:31:15.212Z
last_checked_at: 2026-06-02T22:08:09.641Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:08:09.641Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "All 12 spec actions traced to source (dip-safe re-verify). (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific sensor device models not documented — this spec covers the hub API platform itself"
- "no explicit multi-step macros documented in source"
- "no safety warnings or interlock procedures in source"
- "specific device models not listed — only generic device types (Switch, Dimmer, etc.) via capabilities array"
- "port number not explicitly stated — defaults to HTTP port 80 or HTTPS port 443 on the hub"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
