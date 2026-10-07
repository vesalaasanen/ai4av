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
last_checked_at: 2026-10-07T13:04:38.053Z
generated_at: 2026-10-07T13:04:38.053Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "physical device port/specs, voltage/power, firmware version compatibility, binary command encodings"
  - "key format/structure not stated in source"
  - "routable, levelable - no input/output routing or level control commands in source"
  - "wire path, HTTP method and body shape.\""
  - "wire path and body shape. The documentation operation link identifies PUT.\""
  - "wire path. The documentation operation link identifies DELETE.\""
  - "wire path, required identifiers and body shape. The operation link identifies POST.\""
  - "wire path and request shape. The operation link identifies DELETE.\""
  - "wire path and body shape. The operation link identifies POST.\""
  - "wire path and enabled-value encoding. The operation link identifies PUT.\""
  - "wire path and disabled-value encoding. The operation link identifies PUT.\""
  - "wire path, method and body schema.\""
  - "wire path, required identifiers and body encoding. The operation link identifies PUT.\""
  - "wire path, method and request shape.\""
  - "query wire path and response schema. The operation link identifies GET.\""
  - "query wire path and response schema. All-device listing is represented separately.\""
  - "wire path, method and response schema.\""
  - "wire path and response schema. The operation link identifies GET.\""
  - "individual settable parameters not enumerated in source - API returns full AC state objects"
  - "unsolicited push events not described in source - API appears polling-based (GET patterns)"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:04:38.053Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 action units map to documented operations, transport values are supported, and the 28 source operations are all represented; the enable/disable Climate React pair shares one source operation. (20 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-11
---

# Sensibo Cloud Series Control Spec

## Summary
Sensibo Cloud Series smart AC controller. REST API over HTTPS at `https://home.sensibo.com/api/v2/`. JSON request/response. API key authentication via query parameter `?apiKey=`. Controls AC power state, timers, schedules, and Climate React automation; other AC-state fields are unresolved in this source. Supports bulk operations via Airbend API for enterprise deployments.

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
      description: AC state object; on is demonstrated, other fields and supported values are UNRESOLVED in this source
  notes: "POST /pods/{device_id}/acStates with an acState object is documented; full field schema is UNRESOLVED beyond on:true/false examples."

- id: patch_ac_state_property
  label: Patch AC State Property
  kind: action
  params: []
  description: "Semantic operation only; no parameter schema is asserted. Required parameters and wire types are UNRESOLVED."
  notes: "Change only one property of the AC state is documented; UNRESOLVED: wire path, HTTP method and body shape."

- id: set_timer
  label: Set Timer
  kind: action
  params: []
  description: "Semantic operation only; no parameter schema is asserted. Required parameters and wire types are UNRESOLVED."
  notes: "Set a timer is documented; UNRESOLVED: wire path and body shape. The documentation operation link identifies PUT."

- id: delete_timer
  label: Delete Timer
  kind: action
  params: []
  description: "Semantic operation only; no parameter schema is asserted. Required parameters and wire types are UNRESOLVED."
  notes: "Delete a timer is documented; UNRESOLVED: wire path. The documentation operation link identifies DELETE."

- id: create_schedule
  label: Create Schedule
  kind: action
  params: []
  description: "Semantic operation only; no parameter schema is asserted. Required parameters and wire types are UNRESOLVED."
  notes: "Create a new schedule is documented; UNRESOLVED: wire path, required identifiers and body shape. The operation link identifies POST."

- id: delete_schedule
  label: Delete Schedule
  kind: action
  params: []
  description: "Semantic operation only; no parameter schema is asserted. Required parameters and wire types are UNRESOLVED."
  notes: "Delete a specific schedule is documented; UNRESOLVED: wire path and request shape. The operation link identifies DELETE."

- id: set_climate_react
  label: Set Climate React Configuration
  kind: action
  params: []
  description: "Semantic operation only; no parameter schema is asserted. Required parameters and wire types are UNRESOLVED."
  notes: "Set Climate React configuration is documented; UNRESOLVED: wire path and body shape. The operation link identifies POST."

- id: enable_climate_react
  label: Enable Climate React
  kind: action
  params: []
  description: "Semantic operation only; no parameter schema is asserted. Required parameters and wire types are UNRESOLVED."
  notes: "Enable Climate React is documented; UNRESOLVED: wire path and enabled-value encoding. The operation link identifies PUT."

- id: disable_climate_react
  label: Disable Climate React
  kind: action
  params: []
  description: "Semantic operation only; no parameter schema is asserted. Required parameters and wire types are UNRESOLVED."
  notes: "Disable Climate React is documented; UNRESOLVED: wire path and disabled-value encoding. The operation link identifies PUT."

# Airbend bulk actions (enterprise)
- id: airbend_set_ac_state_bulk
  label: Bulk Set AC State
  kind: action
  params: []
  description: "Semantic operation only; no parameter schema is asserted. Required parameters and wire types are UNRESOLVED."
  notes: "Set AC state for multiple devices simultaneously is documented; UNRESOLVED: wire path, method and body schema."

- id: airbend_reset_devices
  label: Bulk Reset Devices (Admin)
  kind: action
  params: []
  description: "Semantic operation only; no parameter schema is asserted. Required parameters and wire types are UNRESOLVED."
  notes: "Bulk reset devices in an organization is documented and admin only; UNRESOLVED: wire path, method and body schema."
- id: set_schedule_enabled
  label: Enable or Disable a Specific Schedule
  kind: action
  params: []
  description: "Semantic operation only; no parameter schema is asserted. Required parameters and wire types are UNRESOLVED."
  notes: "Enable or disable a specific schedule is documented; UNRESOLVED: wire path, required identifiers and body encoding. The operation link identifies PUT."

- id: airbend_remove_user
  label: Remove Airbend Organization User
  kind: action
  params: []
  description: "Semantic operation only; no parameter schema is asserted. Required parameters and wire types are UNRESOLVED."
  notes: "Remove a user from an Airbend organization is documented and admin only; UNRESOLVED: wire path, method and request shape."
```

## Feedbacks
```yaml
- id: ac_state
  label: AC State
  type: object
  description: Current and previous AC state; full response fields are UNRESOLVED.
  query_command: "https://support.sensibo.com/api/operations/podsdevice_idacstates/get"
  notes: "Current and previous AC states are documented; UNRESOLVED: query wire path and response schema. The operation link identifies GET."

- id: device_info
  label: Device Info
  type: object
  description: Specific device information; full response fields are UNRESOLVED.
  query_command: "https://support.sensibo.com/api/operations/podsdevice_id"
  notes: "Specific device info is documented; UNRESOLVED: query wire path and response schema. All-device listing is represented separately."

- id: historical_measurements
  label: Historical Measurements
  type: object
  description: Historical climate measurements for a device
  query_command: "https://home.sensibo.com/api/v2/pods/{device_id}/historicalMeasurements"
  notes: "Source demonstrates the query with apiKey and days=1; supported days range and response fields are UNRESOLVED."

- id: device_events
  label: Device Events
  type: object
  description: Device event log
  query_command: "https://support.sensibo.com/api/operations/podsdevice_idevents"
  notes: "Device events are documented; UNRESOLVED: wire path, method and response schema."

- id: door_sensor_events
  label: Door Sensor Events
  type: object
  description: Door sensor open/close events
  query_command: "https://support.sensibo.com/api/operations/doorsensorssensor_idevents"
  notes: "Door sensor open/close events are documented; UNRESOLVED: wire path, method and response schema."

- id: timer_state
  label: Timer State
  type: object
  description: Current timer configuration
  query_command: "https://support.sensibo.com/api/operations/podsdevice_idtimer/get"
  notes: "Current timer is documented; UNRESOLVED: wire path and response schema. The operation link identifies GET."

- id: schedule_list
  label: Schedule List
  type: array
  description: All scheduled items for a device
  query_command: "https://support.sensibo.com/api/operations/podsdevice_idschedules/get"
  notes: "Scheduled items are documented; UNRESOLVED: wire path and response schema. The operation link identifies GET."

- id: climate_react_settings
  label: Climate React Settings
  type: object
  description: Current Climate React configuration
  query_command: "https://support.sensibo.com/api/operations/podsdevice_idsmartmode/get"
  notes: "Climate React settings are documented; UNRESOLVED: wire path and response schema. The operation link identifies GET."

- id: airbend_devices
  label: Airbend Organization Devices
  type: array
  description: All devices in Airbend organization
  query_command: "https://support.sensibo.com/api/operations/airbendmedevices"
  notes: "Airbend organization device listing is documented; UNRESOLVED: wire path, method and response schema."

- id: airbend_bulk_historical
  label: Airbend Bulk Historical Measurements
  type: object
  description: Bulk historical measurements for organization devices
  query_command: "https://support.sensibo.com/api/operations/airbendmebulkhistoricalmeasurements"
  notes: "Bulk historical measurements are documented; UNRESOLVED: wire path, method and response schema."

- id: airbend_bulk_door_sensor_events
  label: Airbend Bulk Door Sensor Events
  type: object
  description: Bulk door sensor events for organization devices
  query_command: "https://support.sensibo.com/api/operations/airbendmebulkdoorsensorevents"
  notes: "Bulk door sensor events are documented; UNRESOLVED: wire path, method and response schema."

- id: airbend_bulk_events
  label: Airbend Bulk Device Events
  type: object
  description: Bulk device events for organization devices
  query_command: "https://support.sensibo.com/api/operations/airbendmebulkevents"
  notes: "Bulk device events are documented; UNRESOLVED: wire path, method and response schema."

- id: airbend_users
  label: Airbend Organization Users
  type: array
  description: Users in Airbend organization
  query_command: "https://support.sensibo.com/api/operations/airbendmeusers"
  notes: "Airbend organization user listing is documented and admin only; UNRESOLVED: wire path, method and response schema."

- id: user_permissions
  label: User Permissions
  type: object
  description: User permissions in Airbend organization
  query_command: "https://support.sensibo.com/api/operations/airbendmeusersemailpermissions"
  notes: "Airbend user permissions are documented; UNRESOLVED: wire path, method and response schema."
- id: all_device_info
  label: All Device Information
  query_command: "https://home.sensibo.com/api/v2/users/me/pods"
  type: object
  description: All-device information from the documented GET example with fields=* and apiKey; response schema is UNRESOLVED.

- id: specific_schedule
  label: Specific Schedule
  type: object
  description: A specific schedule is documented; wire path and response schema are UNRESOLVED. The documentation operation link identifies GET.
  query_command: "https://support.sensibo.com/api/operations/podsdevice_idschedulesschedule_id/get"
```

## Variables
```yaml
# UNRESOLVED: individual settable parameters not enumerated in source - API returns full AC state objects
# Only the on boolean is demonstrated in the source; additional AC-state fields and allowed values are UNRESOLVED.
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
<!-- UNRESOLVED: flattened documentation operation URLs are not literal API request paths. No path/casing, body schema or method has been reconstructed from a flattened slug. Named operations without request examples remain semantic descriptions requiring their detailed reference pages. -->

## Provenance

```yaml
source_domains:
  - support.sensibo.com
source_urls:
  - https://support.sensibo.com/api/
retrieved_at: 2026-05-14T10:39:18.298Z
last_checked_at: 2026-10-07T13:04:38.053Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:04:38.053Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 action units map to documented operations, transport values are supported, and the 28 source operations are all represented; the enable/disable Climate React pair shares one source operation. (20 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "physical device port/specs, voltage/power, firmware version compatibility, binary command encodings"
- "key format/structure not stated in source"
- "routable, levelable - no input/output routing or level control commands in source"
- "wire path, HTTP method and body shape.\""
- "wire path and body shape. The documentation operation link identifies PUT.\""
- "wire path. The documentation operation link identifies DELETE.\""
- "wire path, required identifiers and body shape. The operation link identifies POST.\""
- "wire path and request shape. The operation link identifies DELETE.\""
- "wire path and body shape. The operation link identifies POST.\""
- "wire path and enabled-value encoding. The operation link identifies PUT.\""
- "wire path and disabled-value encoding. The operation link identifies PUT.\""
- "wire path, method and body schema.\""
- "wire path, required identifiers and body encoding. The operation link identifies PUT.\""
- "wire path, method and request shape.\""
- "query wire path and response schema. The operation link identifies GET.\""
- "query wire path and response schema. All-device listing is represented separately.\""
- "wire path, method and response schema.\""
- "wire path and response schema. The operation link identifies GET.\""
- "individual settable parameters not enumerated in source - API returns full AC state objects"
- "unsolicited push events not described in source - API appears polling-based (GET patterns)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
