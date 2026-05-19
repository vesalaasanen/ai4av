---
spec_id: admin/sensibo-cloud-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sensibo Cloud Series Control Spec"
manufacturer: Sensibo
model_family: "Sensibo Cloud Series"
aliases: []
compatible_with:
  manufacturers:
    - Sensibo
  models:
    - "Sensibo Cloud Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.sensibo.com
source_urls:
  - https://support.sensibo.com/api/
retrieved_at: 2026-05-14T10:39:18.298Z
last_checked_at: 2026-05-18T16:51:18.196Z
generated_at: 2026-05-18T16:51:18.196Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-18T16:51:18.196Z
  matched_actions: 13
  action_count: 13
  confidence: high
  summary: "All 13 spec actions matched semantically to source operations; transport parameters verified; full coverage of source operations."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-11
---

# Sensibo Cloud Series Control Spec

## Summary
Sensibo Cloud Series smart AC controller. REST API over HTTPS at `https://home.sensibo.com/api/v2/`. JSON request/response. API key authentication via query parameter `?apiKey=`. Controls AC power state, mode, temperature, timers, schedules, and Climate React automation. Supports bulk operations via Airbend API for enterprise deployments.

<!-- UNRESOLVED: physical device port/specs, voltage/power, firmware version compatibility, binary command encodings -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: https://home.sensibo.com/api/v2/
auth:
  type: api_key
  location: query_param
  param_name: apiKey
  # UNRESOLVED: key format/structure not stated in source
note: "Rate limited; use `Accept-Encoding: gzip` header to increase limits. HTTP 429 indicates limit hit."
```

## Traits
```yaml
- powerable  # inferred: POST /acStates with {on:true/false} explicitly documented
- queryable  # inferred: GET endpoints for device state, measurements, events
# UNRESOLVED: routable, levelable - no input/output routing or level control commands in source
```

## Actions
```yaml
- id: turn_ac_on
  label: Turn AC On
  kind: action
  params:
    - name: device_id
      type: string
      description: Pod device ID
    - name: acState
      type: object
      description: AC state object
  notes: POST /pods/{device_id}/acStates with body {"acState":{"on":true}}

- id: turn_ac_off
  label: Turn AC Off
  kind: action
  params:
    - name: device_id
      type: string
      description: Pod device ID
    - name: acState
      type: object
      description: AC state object
  notes: POST /pods/{device_id}/acStates with body {"acState":{"on":false}}

- id: set_ac_state
  label: Set Full AC State
  kind: action
  params:
    - name: device_id
      type: string
      description: Pod device ID
    - name: acState
      type: object
      description: Full AC state object (on, mode, fanLevel, targetTemperature, swing, etc.)
  notes: POST /pods/{device_id}/acStates with full acState body

- id: patch_ac_state_property
  label: Patch AC State Property
  kind: action
  params:
    - name: device_id
      type: string
      description: Pod device ID
    - name: property
      type: string
      description: Property name to change (e.g., "on", "mode", "fanLevel")
    - name: value
      type: object
      description: New value for the property
  notes: PATCH /pods/{device_id}/acStates/{property} - change single property of AC state

- id: set_timer
  label: Set Timer
  kind: action
  params:
    - name: device_id
      type: string
      description: Pod device ID
    - name: timer
      type: object
      description: Timer configuration object
  notes: PUT /pods/{device_id}/timer

- id: delete_timer
  label: Delete Timer
  kind: action
  params:
    - name: device_id
      type: string
      description: Pod device ID
  notes: DELETE /pods/{device_id}/timer

- id: create_schedule
  label: Create Schedule
  kind: action
  params:
    - name: device_id
      type: string
      description: Pod device ID
    - name: schedule
      type: object
      description: Schedule configuration object
  notes: POST /pods/{device_id}/schedules/{schedule_id}

- id: delete_schedule
  label: Delete Schedule
  kind: action
  params:
    - name: device_id
      type: string
      description: Pod device ID
    - name: schedule_id
      type: string
      description: Schedule ID to delete
  notes: DELETE /pods/{device_id}/schedules/{schedule_id}

- id: set_climate_react
  label: Set Climate React Configuration
  kind: action
  params:
    - name: device_id
      type: string
      description: Pod device ID
    - name: config
      type: object
      description: Climate React configuration object
  notes: POST /pods/{device_id}/smartMode

- id: enable_climate_react
  label: Enable Climate React
  kind: action
  params:
    - name: device_id
      type: string
      description: Pod device ID
  notes: PUT /pods/{device_id}/smartMode with enabled state

- id: disable_climate_react
  label: Disable Climate React
  kind: action
  params:
    - name: device_id
      type: string
      description: Pod device ID
  notes: PUT /pods/{device_id}/smartMode with disabled state

# Airbend bulk actions (enterprise)
- id: airbend_set_ac_state_bulk
  label: Bulk Set AC State
  kind: action
  params:
    - name: devices
      type: array
      description: Array of device IDs and acState objects
  notes: POST /airbend/me/bulkACStates - set AC state for multiple devices simultaneously

- id: airbend_reset_devices
  label: Bulk Reset Devices (Admin)
  kind: action
  params:
    - name: device_ids
      type: array
      description: Array of device IDs to reset
  notes: POST /airbend/me/bulkDeviceReset - admin only, bulk reset devices
```

## Feedbacks
```yaml
- id: ac_state
  label: AC State
  type: object
  description: Current AC power, mode, fan level, target temperature, swing, horizontal/vertical swing
  notes: GET /pods/{device_id}/acStates returns current and previous AC state

- id: device_info
  label: Device Info
  type: object
  description: Full device information including measurements and configuration
  notes: GET /pods/{device_id} returns device info; GET /pods?fields=* returns all devices

- id: historical_measurements
  label: Historical Measurements
  type: object
  description: Historical climate measurements for a device
  notes: GET /pods/{device_id}/historicalMeasurements?days=N

- id: device_events
  label: Device Events
  type: object
  description: Device event log
  notes: GET /pods/{device_id}/events

- id: door_sensor_events
  label: Door Sensor Events
  type: object
  description: Door sensor open/close events
  notes: GET /doorsensors/{sensor_id}/events

- id: timer_state
  label: Timer State
  type: object
  description: Current timer configuration
  notes: GET /pods/{device_id}/timer

- id: schedule_list
  label: Schedule List
  type: array
  description: All scheduled items for a device
  notes: GET /pods/{device_id}/schedules

- id: climate_react_settings
  label: Climate React Settings
  type: object
  description: Current Climate React configuration
  notes: GET /pods/{device_id}/smartMode

- id: airbend_devices
  label: Airbend Organization Devices
  type: array
  description: All devices in Airbend organization
  notes: GET /airbend/me/devices

- id: airbend_bulk_historical
  label: Airbend Bulk Historical Measurements
  type: object
  description: Bulk historical measurements for organization devices
  notes: GET /airbend/me/bulkHistoricalMeasurements

- id: airbend_bulk_door_sensor_events
  label: Airbend Bulk Door Sensor Events
  type: object
  description: Bulk door sensor events for organization devices
  notes: GET /airbend/me/bulkDoorSensorEvents

- id: airbend_bulk_events
  label: Airbend Bulk Device Events
  type: object
  description: Bulk device events for organization devices
  notes: GET /airbend/me/bulkEvents

- id: airbend_users
  label: Airbend Organization Users
  type: array
  description: Users in Airbend organization
  notes: GET /airbend/me/users - admin only

- id: user_permissions
  label: User Permissions
  type: object
  description: User permissions in Airbend organization
  notes: GET /airbend/me/users/{email}/permissions
```

## Variables
```yaml
# UNRESOLVED: individual settable parameters not enumerated in source - API returns full AC state objects
# Temperature, mode, fanLevel, swing are part of acState object, not independent variables
```

## Events
```yaml
# UNRESOLVED: unsolicited push events not described in source - API appears polling-based (GET patterns)
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing in source
```

## Notes
API v2 at `https://home.sensibo.com/api/v2/`. Key generation via account settings page (`https://home.sensibo.com/me/api`). Key passed as `?apiKey={key}` query parameter. `Accept-Encoding: gzip` header required to achieve higher rate limits; HTTP 429 indicates limit hit. Airbend API adds organization-level bulk control for enterprise deployments — requires admin privileges for user management and sensitive operations. Device ID is a pod identifier used in path parameters `{device_id}`. No binary protocol, serial, or voltage specs in source.
<!-- UNRESOLVED: auth credential format, firmware version, physical port specs, power consumption, event push model, binary encoding details -->

## Provenance

```yaml
source_domains:
  - support.sensibo.com
source_urls:
  - https://support.sensibo.com/api/
retrieved_at: 2026-05-14T10:39:18.298Z
last_checked_at: 2026-05-18T16:51:18.196Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-18T16:51:18.196Z
matched_actions: 13
action_count: 13
confidence: high
summary: "All 13 spec actions matched semantically to source operations; transport parameters verified; full coverage of source operations."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
