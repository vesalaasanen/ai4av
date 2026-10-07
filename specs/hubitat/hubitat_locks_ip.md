---
spec_id: admin/hubitat-lock-maker-api
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hubitat Lock Control via Maker API"
manufacturer: Hubitat
model_family: "Hubitat-compatible Zigbee/Z-Wave locks exposed via Maker API"
aliases: []
compatible_with:
  manufacturers:
    - Hubitat
  models:
    - "Hubitat-compatible Zigbee/Z-Wave locks exposed via Maker API"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs2.hubitat.com
source_urls:
  - https://docs2.hubitat.com/en/apps/maker-api
  - https://docs2.hubitat.com/en/developer/driver/capability-list
  - https://docs2.hubitat.com/en/developer
retrieved_at: 2026-05-03T09:18:51.697Z
last_checked_at: 2026-10-07T13:27:15.938Z
generated_at: 2026-10-07T13:27:15.938Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source documents a setCode example but does not provide a lock-specific command catalogue or lock-state values."
  - "TCP port and HTTP methods for the device endpoints are not stated in source."
  - "source does not specify lock-state values or document a lock-state attribute."
  - "source does not document a Variables section for lock devices"
  - "no multi-step sequences documented in source for locks"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:27:15.938Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 action units match source endpoints literally and base URL supported; source is the generic Maker API so lock applicability is inferred. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Hubitat Lock Control via Maker API

## Summary
Spec covers control of device endpoints exposed through a Hubitat Elevation hub's Maker API app. The source documents HTTP endpoints under `/apps/api/[app_id]` and JSON responses for device queries. It documents a `setCode` command example but does not document a lock/unlock command catalogue or lock-state values. Generic Maker API surface (rooms, modes, hub variables, HSM, driver changes) out of scope here — only lock-relevant endpoints listed.

<!-- UNRESOLVED: source documents a setCode example but does not provide a lock-specific command catalogue or lock-state values. -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: http://[hub_ip]/apps/api/[app_id]
auth:
  type: UNRESOLVED  # Source shows an access_token parameter on a setColor example but does not establish the authentication scheme for these endpoints.
```

<!-- UNRESOLVED: TCP port and HTTP methods for the device endpoints are not stated in source. -->

## Traits
```yaml
- lockable        # inferred from the source's lock-code example
- queryable       # device attribute endpoint is documented
- codeable        # source documents a setCode example
```

## Actions
```yaml
# Generic per-device command endpoint documented by the source.
# The device details and commands endpoints expose device-specific information. The source warns
# that not every listed command is necessarily available via the API.
- id: send_command
  label: Send device command
  kind: action
  command: "/devices/{device_id}/{command}/{secondary_value}"
  params:
    - name: device_id
      type: integer
      description: Numeric device ID
    - name: command
      type: string
      description: Command name listed for the device
    - name: secondary_value
      type: string
      description: Optional command parameter; multiple parameters may be separated by commas

- id: set_code
  label: Set user code at position
  kind: action
  command: "/devices/{device_id}/setCode/{position},{code},{name}"
  params:
    - name: device_id
      type: integer
      description: Numeric device ID
    - name: position
      type: integer
      description: Code slot position; source example uses position 3
    - name: code
      type: string
      description: User code; length constraints are not stated in source
    - name: name
      type: string
      description: Label for the code slot

- id: get_attribute
  label: Get device attribute value
  kind: query
  command: "/devices/{device_id}/attribute/{attribute_name}"
  params:
    - name: device_id
      type: integer
      description: Numeric device ID
    - name: attribute_name
      type: string
      description: Attribute name; source example uses switch

- id: list_device_commands
  label: List commands supported by device
  kind: query
  command: "/devices/{device_id}/commands"
  params:
    - name: device_id
      type: integer
      description: Numeric device ID

- id: list_devices
  label: List all authorized devices
  kind: query
  command: "/devices"
  params: []

- id: get_device
  label: Get single device details
  kind: query
  command: "/devices/{device_id}"
  params:
    - name: device_id
      type: integer
      description: Numeric device ID

- id: get_device_events
  label: Get recent device events
  kind: query
  command: "/devices/{device_id}/events"
  params:
    - name: device_id
      type: integer
      description: Numeric device ID

- id: set_label
  label: Set device label
  kind: action
  command: "/devices/{device_id}/setLabel?label={new_label}"
  params:
    - name: device_id
      type: integer
      description: Numeric device ID
    - name: new_label
      type: string
      description: New display label; URL encoding may be required

- id: list_all_device_details
  label: List all authorized device details
  kind: query
  command: "/devices/all"
  params: []

- id: set_driver
  label: Set device driver
  kind: action
  command: "/devices/[device id]/setDriver?namespace=[namespace]&name=[name]"
  params:
    - name: device_id
      type: integer
      description: Numeric device ID
    - name: namespace
      type: string
      description: Driver namespace
    - name: name
      type: string
      description: Driver name; URL encoding may be required

- id: list_rooms
  label: List rooms
  kind: query
  command: "/rooms"
  params: []

- id: get_room
  label: Get room details
  kind: query
  command: "room/select/[id]"
  params:
    - name: id
      type: UNRESOLVED
      description: Room ID

- id: create_room
  label: Create room
  kind: action
  command: "/room/insert?name=[room name]&deviceIds=[device id list]"
  params:
    - name: name
      type: string
      description: Room name
    - name: device_ids
      type: string
      description: Device ID list

- id: update_room
  label: Update room
  kind: action
  command: "room/update/[room id]?name=[room name]&deviceIds=[device id list]"
  params:
    - name: room_id
      type: UNRESOLVED
      description: Room ID
    - name: name
      type: string
      description: Room name
    - name: device_ids
      type: string
      description: Device ID list

- id: delete_room
  label: Delete room
  kind: action
  command: "/room/delete/[room id]"
  params:
    - name: room_id
      type: UNRESOLVED
      description: Room ID

- id: list_hub_variables
  label: List hub variables
  kind: query
  command: "/hubvariables"
  params: []

- id: get_hub_variable
  label: Get hub variable
  kind: query
  command: "/hubvariables/[variable name]"
  params:
    - name: variable_name
      type: string
      description: Variable name

- id: set_hub_variable
  label: Set hub variable value
  kind: action
  command: "/hubvariables/[variable name]/[value]"
  params:
    - name: variable_name
      type: string
      description: Variable name
    - name: value
      type: string
      description: Variable value; values are case-sensitive and URL encoding may be required

- id: get_mode
  label: Get current mode
  kind: query
  command: "/modes"
  params: []

- id: set_mode
  label: Set mode
  kind: action
  command: "/modes/<id>"
  params:
    - name: id
      type: integer
      description: Numeric ID of the mode to set

- id: get_hsm_status
  label: Get HSM status
  kind: query
  command: "/hsm"
  params: []

- id: set_hsm_status
  label: Set HSM status
  kind: action
  command: "/hsm/<value>"
  params:
    - name: value
      type: string
      description: HSM status to set; source example uses armAway

- id: set_post_url
  label: Set event POST URL
  kind: action
  command: "/postURL/[URL]"
  params:
    - name: URL
      type: string
      description: URL to send device event POSTs to; URL encoding is required

- id: clear_post_url
  label: Clear event POST URL
  kind: action
  command: "/postURL"
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: source does not specify lock-state values or document a lock-state attribute.
- id: lock_state
  type: enum
  values: UNRESOLVED

- id: attribute_value
  type: string
  query_command: "/devices/{device_id}/attribute/{attribute_name}"
  # Source example returns {"id":"123","attribute":"switch","value":"off"}.
```

## Variables
```yaml
# UNRESOLVED: source does not document a Variables section for lock devices
```

## Events
```yaml
# HTTP POST push source documents this content object; field types are not specified.
- id: device_event_push
  description: Event pushed via HTTP POST to configured postURL
  payload:
    content:
      name: UNRESOLVED
      value: UNRESOLVED
      displayName: UNRESOLVED
      deviceId: UNRESOLVED
      descriptionText: UNRESOLVED
      unit: UNRESOLVED
      data: UNRESOLVED
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source for locks
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source does not document safety interlocks, code-length constraints, or rate limits.
```

## Notes
- The source documents `setCode` as a per-device command example. Other device commands can be listed by `/devices/{id}/commands`, but the source cautions that a listed command may not work via the API. It does not document lock/unlock or deleteCode commands.
- An `access_token` parameter appears on the setColor example endpoint. The source does not establish the authentication scheme for these device endpoints or document token issuance or required scopes.
- HTTP methods for the device endpoints and TCP port are not stated in source. The event push endpoint uses HTTP POST. The documented base path is `/apps/api/[app_id]`.
- POST URL push (`/postURL/[URL]`) clears when `/postURL` is invoked with no path, per source.
- Lock-state values, code-length constraints, and firmware or driver version are not stated in source.

## Provenance

```yaml
source_domains:
  - docs2.hubitat.com
source_urls:
  - https://docs2.hubitat.com/en/apps/maker-api
  - https://docs2.hubitat.com/en/developer/driver/capability-list
  - https://docs2.hubitat.com/en/developer
retrieved_at: 2026-05-03T09:18:51.697Z
last_checked_at: 2026-10-07T13:27:15.938Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:27:15.938Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 action units match source endpoints literally and base URL supported; source is the generic Maker API so lock applicability is inferred. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source documents a setCode example but does not provide a lock-specific command catalogue or lock-state values."
- "TCP port and HTTP methods for the device endpoints are not stated in source."
- "source does not specify lock-state values or document a lock-state attribute."
- "source does not document a Variables section for lock devices"
- "no multi-step sequences documented in source for locks"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
