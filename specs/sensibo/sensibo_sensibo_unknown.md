---
spec_id: admin/sensibo-sensibo
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sensibo AC Controller API Specification"
manufacturer: Sensibo
model_family: Sensibo
aliases: []
compatible_with:
  manufacturers:
    - Sensibo
  models:
    - Sensibo
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.sensibo.com
  - home.sensibo.com
source_urls:
  - https://support.sensibo.com/api/
  - https://support.sensibo.com/api/operations/podsdevice_idacstates/post
  - https://home.sensibo.com/me/api
retrieved_at: 2026-05-27T14:00:29.234Z
last_checked_at: 2026-05-31T21:05:27.544Z
generated_at: 2026-05-31T21:05:27.544Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific AC unit models compatible with Sensibo hardware not listed in source"
  - "key format/length not stated in source"
  - "key rotation frequency/requirements not stated in source"
  - "swing/mode/fan speed not confirmed as discrete traits"
  - "full enum values not explicitly enumerated in source documentation"
  - "mode enum values not stated (cooling/heating/auto/dry/fan only)"
  - "fan level enum values not stated"
  - "temperature range not stated"
  - "swing enum values not stated"
  - "full list of AC state properties not explicitly enumerated in source"
  - "event schema and subscription mechanism not described in source"
  - "multi-step sequences not documented in source"
  - "no safety warnings or interlock procedures in source"
  - "AC state property enum values (mode, fanLevel, swing) not enumerated in source"
  - "temperature range/min/max not stated in source"
  - "device event subscription mechanism not described in source"
  - "specific Sensibo hardware model variants not enumerated in source"
verification:
  verdict: verified
  checked_at: 2026-05-31T21:05:27.544Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions have literal matches in the source documentation; transport parameters verified; one-to-one coverage of source operations. (17 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Sensibo AC Controller API Specification

## Summary
Sensibo is a smart AC controller that exposes a REST API over HTTPS for remote control of air conditioning units. The API is versioned (v2) and uses JSON for all requests and responses. Authentication is via API key passed as a query parameter.

<!-- UNRESOLVED: specific AC unit models compatible with Sensibo hardware not listed in source -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: https://home.sensibo.com/api/v2
auth:
  type: apiKey
  location: query_param
  param_name: apiKey
  # UNRESOLVED: key format/length not stated in source
  # UNRESOLVED: key rotation frequency/requirements not stated in source
```

## Traits
```yaml
# inferred from AC state control examples:
traits:
  - powerable
  - levelable  # temperature setpoint
  - queryable  # state queries present
# UNRESOLVED: swing/mode/fan speed not confirmed as discrete traits
```

## Actions
```yaml
actions:
  # Device enumeration
  - id: get_all_devices
    label: Get All Devices
    kind: query
    params: []
    method: GET
    path: /users/me/pods
    description: Retrieve all Sensibo pods for the authenticated user

  - id: get_device
    label: Get Device Info
    kind: query
    params:
      - name: device_id
        type: string
        location: path
        description: Device identifier
    method: GET
    path: /pods/{device_id}

  # AC State control
  - id: get_ac_states
    label: Get AC States
    kind: query
    params:
      - name: device_id
        type: string
        location: path
    method: GET
    path: /pods/{device_id}/acStates

  - id: set_ac_state
    label: Set AC State
    kind: action
    params:
      - name: device_id
        type: string
        location: path
      - name: acState
        type: object
        location: body
        description: Full AC state object with on, mode, fanLevel, targetTemperature, swing, etc.
    method: POST
    path: /pods/{device_id}/acStates

  - id: patch_ac_state
    label: Update AC State Property
    kind: action
    params:
      - name: device_id
        type: string
        location: path
      - name: property
        type: string
        location: path
        description: Property name to update (e.g., on, targetTemperature)
      - name: acState
        type: object
        location: body
        description: Partial AC state object
    method: POST
    path: /pods/{device_id}/acStates/{property}

  # Measurements and events
  - id: get_historical_measurements
    label: Get Historical Measurements
    kind: query
    params:
      - name: device_id
        type: string
        location: path
      - name: days
        type: integer
        location: query
        description: Number of days of history (default varies)
    method: GET
    path: /pods/{device_id}/historicalMeasurements

  - id: get_device_events
    label: Get Device Events
    kind: query
    params:
      - name: device_id
        type: string
        location: path
    method: GET
    path: /pods/{device_id}/events

  - id: get_door_sensor_events
    label: Get Door Sensor Events
    kind: query
    params:
      - name: sensor_id
        type: string
        location: path
    method: GET
    path: /doorsensors/{sensor_id}/events

  # Timer operations
  - id: get_timer
    label: Get Current Timer
    kind: query
    params:
      - name: device_id
        type: string
        location: path
    method: GET
    path: /pods/{device_id}/timer

  - id: set_timer
    label: Set Timer
    kind: action
    params:
      - name: device_id
        type: string
        location: path
    method: PUT
    path: /pods/{device_id}/timer

  - id: delete_timer
    label: Delete Timer
    kind: action
    params:
      - name: device_id
        type: string
        location: path
    method: DELETE
    path: /pods/{device_id}/timer

  # Schedule operations
  - id: get_schedules
    label: Get Scheduled Items
    kind: query
    params:
      - name: device_id
        type: string
        location: path
    method: GET
    path: /pods/{device_id}/schedules

  - id: create_schedule
    label: Create Schedule
    kind: action
    params:
      - name: device_id
        type: string
        location: path
    method: POST
    path: /pods/{device_id}/schedules

  - id: get_schedule
    label: Get Specific Schedule
    kind: query
    params:
      - name: device_id
        type: string
        location: path
      - name: schedule_id
        type: string
        location: path
    method: GET
    path: /pods/{device_id}/schedules/{schedule_id}

  - id: update_schedule
    label: Enable or Disable Schedule
    kind: action
    params:
      - name: device_id
        type: string
        location: path
      - name: schedule_id
        type: string
        location: path
    method: PUT
    path: /pods/{device_id}/schedules/{schedule_id}

  - id: delete_schedule
    label: Delete Schedule
    kind: action
    params:
      - name: device_id
        type: string
        location: path
      - name: schedule_id
        type: string
        location: path
    method: DELETE
    path: /pods/{device_id}/schedules/{schedule_id}

  # Climate React operations
  - id: get_climate_react
    label: Get Climate React Settings
    kind: query
    params:
      - name: device_id
        type: string
        location: path
    method: GET
    path: /pods/{device_id}/smartmode

  - id: set_climate_react_enabled
    label: Enable or Disable Climate React
    kind: action
    params:
      - name: device_id
        type: string
        location: path
    method: PUT
    path: /pods/{device_id}/smartmode

  - id: configure_climate_react
    label: Set Climate React Configuration
    kind: action
    params:
      - name: device_id
        type: string
        location: path
    method: POST
    path: /pods/{device_id}/smartmode

  # Airbend operations (organization-level bulk control)
  - id: airbend_get_devices
    label: Get Airbend Organization Devices
    kind: query
    params: []
    method: GET
    path: /airbend/me/devices

  - id: airbend_bulk_historical
    label: Get Bulk Historical Measurements
    kind: query
    params: []
    method: GET
    path: /airbend/me/bulk-historical-measurements

  - id: airbend_bulk_door_events
    label: Get Bulk Door Sensor Events
    kind: query
    params: []
    method: GET
    path: /airbend/me/bulk-door-sensor-events

  - id: airbend_bulk_events
    label: Get Bulk Device Events
    kind: query
    params: []
    method: GET
    path: /airbend/me/bulk-events

  - id: airbend_set_bulk_ac_states
    label: Set AC State for Multiple Devices
    kind: action
    params: []
    method: POST
    path: /airbend/me/bulk-ac-states

  - id: airbend_bulk_device_reset
    label: Bulk Reset Devices (Admin Only)
    kind: action
    params: []
    method: POST
    path: /airbend/me/bulk-device-reset

  - id: airbend_get_users
    label: Get Airbend Organization Users (Admin Only)
    kind: query
    params: []
    method: GET
    path: /airbend/me/users

  - id: airbend_remove_user
    label: Remove User from Airbend Organization (Admin Only)
    kind: action
    params:
      - name: email
        type: string
        location: path
    method: DELETE
    path: /airbend/me/users/{email}

  - id: airbend_get_user_permissions
    label: Get User Permissions in Airbend Organization
    kind: query
    params:
      - name: email
        type: string
        location: path
    method: GET
    path: /airbend/me/users/{email}/permissions
```

## Feedbacks
```yaml
# AC state properties returned by the API:
# UNRESOLVED: full enum values not explicitly enumerated in source documentation
feedbacks:
  - id: ac_state_on
    label: AC Power State
    type: boolean
    description: Whether the AC unit is on or off

  - id: ac_state_mode
    label: AC Mode
    type: string
    # UNRESOLVED: mode enum values not stated (cooling/heating/auto/dry/fan only)

  - id: fan_level
    label: Fan Level
    type: string
    # UNRESOLVED: fan level enum values not stated

  - id: target_temperature
    label: Target Temperature
    type: number
    # UNRESOLVED: temperature range not stated

  - id: swing
    label: Swing Mode
    type: string
    # UNRESOLVED: swing enum values not stated
```

## Variables
```yaml
# UNRESOLVED: full list of AC state properties not explicitly enumerated in source
```

## Events
```yaml
# Device emits events via GET endpoint; specific event types not enumerated in source
# UNRESOLVED: event schema and subscription mechanism not described in source
```

## Macros
```yaml
# UNRESOLVED: multi-step sequences not documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Sensibo API requires `Accept-Encoding: gzip` header to achieve higher rate limits. Rate limiting returns HTTP 429. OAuth2 available for commercial users via support@sensibo.com.
<!-- UNRESOLVED: AC state property enum values (mode, fanLevel, swing) not enumerated in source -->
<!-- UNRESOLVED: temperature range/min/max not stated in source -->
<!-- UNRESOLVED: device event subscription mechanism not described in source -->
<!-- UNRESOLVED: specific Sensibo hardware model variants not enumerated in source -->

## Provenance

```yaml
source_domains:
  - support.sensibo.com
  - home.sensibo.com
source_urls:
  - https://support.sensibo.com/api/
  - https://support.sensibo.com/api/operations/podsdevice_idacstates/post
  - https://home.sensibo.com/me/api
retrieved_at: 2026-05-27T14:00:29.234Z
last_checked_at: 2026-05-31T21:05:27.544Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T21:05:27.544Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions have literal matches in the source documentation; transport parameters verified; one-to-one coverage of source operations. (17 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific AC unit models compatible with Sensibo hardware not listed in source"
- "key format/length not stated in source"
- "key rotation frequency/requirements not stated in source"
- "swing/mode/fan speed not confirmed as discrete traits"
- "full enum values not explicitly enumerated in source documentation"
- "mode enum values not stated (cooling/heating/auto/dry/fan only)"
- "fan level enum values not stated"
- "temperature range not stated"
- "swing enum values not stated"
- "full list of AC state properties not explicitly enumerated in source"
- "event schema and subscription mechanism not described in source"
- "multi-step sequences not documented in source"
- "no safety warnings or interlock procedures in source"
- "AC state property enum values (mode, fanLevel, swing) not enumerated in source"
- "temperature range/min/max not stated in source"
- "device event subscription mechanism not described in source"
- "specific Sensibo hardware model variants not enumerated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
