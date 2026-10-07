---
spec_id: admin/honeywell-rth9585wf
schema_version: ai4av-public-spec-v1
revision: 1
title: "Honeywell RTH9585WF Control Spec"
manufacturer: Honeywell
model_family: RTH9585WF
aliases: []
compatible_with:
  manufacturers:
    - Honeywell
  models:
    - RTH9585WF
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - developer.honeywellhome.com
source_urls:
  - https://developer.honeywellhome.com/api-methods
retrieved_at: 2026-04-30T04:32:30.743Z
last_checked_at: 2026-09-27T15:05:12.333Z
generated_at: 2026-09-27T15:05:12.333Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "complete payload schemas for POST/PUT requests not included in source"
  - "base URL not stated in source excerpt"
  - "token format, expiry, scope details not in source excerpt"
  - "powerable - no explicit power on/off command in source"
  - "routable - no input/output routing for thermostat"
  - "levelable - temperature setpoint commands may exist but payloads not documented"
  - "OAuth2 client-credentials request fields and encoding are not documented in the source.\""
  - "refresh-token request fields and encoding are not documented in the source.\""
  - "payload schema not documented in source"
  - "request fields, encoding and requiredness beyond documented path placeholders are not specified.\""
  - "response payload structures not documented in source excerpt"
  - "configurable parameters not enumerated in source"
  - "event types and payload schemas not documented"
  - "no multi-step sequences documented in source"
  - "no safety warnings or interlock procedures in source excerpt"
  - "payload schemas for POST/PUT endpoints not included in source"
  - "base URL for API calls not stated in source"
  - "event type definitions not documented"
  - "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
verification:
  verdict: verified
  checked_at: 2026-09-27T15:05:12.333Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 applicable catalogue operations match; camera, leak, DHW and valve classes excluded; exact-model applicability remains unknown. (18 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Honeywell RTH9585WF Control Spec

## Summary
Shared Honeywell/Resideo thermostat REST API catalogue. The source does not name RTH9585WF, so compatibility of that model with these endpoints is UNRESOLVED. Authentication uses documented OAuth2 client credentials and authorization code flows. The catalogue includes thermostat state/settings, schedules, fan control, discovery and event subscription endpoints.

<!-- UNRESOLVED: complete payload schemas for POST/PUT requests not included in source -->

## Transport
```yaml
protocols:
  - http
addressing:
  # UNRESOLVED: base URL not stated in source excerpt
  base_url: null
auth:
  type: oauth2  # stated: OAuth2 token endpoints (/accesstoken, /token, /authorize)
  # UNRESOLVED: token format, expiry, scope details not in source excerpt
```

## Traits
```yaml
# Inferred from GET methods returning device state:
- queryable
# UNRESOLVED: powerable - no explicit power on/off command in source
# UNRESOLVED: routable - no input/output routing for thermostat
# UNRESOLVED: levelable - temperature setpoint commands may exist but payloads not documented
```

## Actions
```yaml
# OAuth2 token management
- id: obtain_oauth2_token
  label: Obtain OAuth2 Client Credentials Token
  kind: action
  http:
    method: POST
    path: /accesstoken
  params: []
  description: "UNRESOLVED: OAuth2 client-credentials request fields and encoding are not documented in the source."

- id: refresh_token
  label: Refresh Token
  kind: action
  http:
    method: POST
    path: /token
  params: []
  description: "UNRESOLVED: refresh-token request fields and encoding are not documented in the source."

# Device operations
- id: get_thermostat
  label: Get Thermostat
  kind: query
  http:
    method: GET
    path: /devices/thermostats/{deviceId}
  params:
    - name: deviceId
      type: string

- id: change_thermostat_settings
  label: Change Thermostat Settings
  kind: action
  http:
    method: POST
    path: /devices/thermostats/{deviceId}
  params:
    - name: deviceId
      type: string
    # UNRESOLVED: payload schema not documented in source

- id: get_fan_settings
  label: Get Fan Settings
  kind: query
  http:
    method: GET
    path: /devices/thermostats/{deviceId}/fan
  params:
    - name: deviceId
      type: string

- id: change_fan_settings
  label: Change Fan Setting
  kind: action
  http:
    method: POST
    path: /devices/thermostats/{deviceId}/fan
  params:
    - name: deviceId
      type: string
    # UNRESOLVED: payload schema not documented in source

- id: set_schedule
  label: Set Schedule
  kind: action
  http:
    method: POST
    path: /devices/schedule/{deviceId}
  params:
    - name: deviceId
      type: string
    # UNRESOLVED: payload schema not documented in source

- id: get_schedule
  label: Get Schedule
  kind: query
  http:
    method: GET
    path: /devices/schedule/{deviceId}
  params:
    - name: deviceId
      type: string

- id: update_adaptive_recovery
  label: Update Adaptive Recovery
  kind: action
  http:
    method: PUT
    path: /devices/schedule/{deviceId}/settings/temperaturemodes/air
  params:
    - name: deviceId
      type: string
    # UNRESOLVED: payload schema not documented in source

- id: pause_schedule
  label: Pause Schedule
  kind: action
  http:
    method: PUT
    path: /devices/schedule/{deviceId}/status/pause
  params:
    - name: deviceId
      type: string

- id: resume_schedule
  label: Resume Schedule
  kind: action
  http:
    method: PUT
    path: /devices/schedule/{deviceId}/status/resume
  params:
    - name: deviceId
      type: string

- id: get_thermostat_configuration
  label: Get Thermostat Configuration
  kind: query
  http:
    method: GET
    path: /devices/thermostats/{deviceId}/thermostatconfiguration
  params:
    - name: deviceId
      type: string

- id: get_room_priority
  label: Get Room Priority
  kind: query
  http:
    method: GET
    path: /devices/thermostats/{deviceId}/priority
  params:
    - name: deviceId
      type: string

- id: set_room_priority
  label: Set Room Priority
  kind: action
  http:
    method: PUT
    path: /devices/thermostats/{deviceId}/priority
  params:
    - name: deviceId
      type: string
    # UNRESOLVED: payload schema not documented in source

# Location and device listing
- id: get_devices
  label: Get All Devices for Location
  kind: query
  http:
    method: GET
    path: /devices
  params: []

- id: get_all_devices_by_type
  label: Get All Devices by Type
  kind: query
  http:
    method: GET
    path: /devices/{deviceType}
  params:
    - name: deviceType
      type: string

- id: get_device_by_id
  label: Get Specific Device by ID
  kind: query
  http:
    method: GET
    path: /devices/{deviceType}/{deviceId}
  params:
    - name: deviceType
      type: string
    - name: deviceId
      type: string

- id: get_locations
  label: Get All Locations and Devices
  kind: query
  http:
    method: GET
    path: /locations
  params: []

# Additional shared catalogue operations
- id: get_authorization_code
  label: Get an Authorization Code
  kind: query
  http:
    method: GET
    path: /authorize
  params: []
  description: "UNRESOLVED: request fields, encoding and requiredness beyond documented path placeholders are not specified."

- id: create_token_from_authorization_code
  label: Create a Token from an Authorization Code
  kind: action
  http:
    method: POST
    path: /token
  params: []
  description: "UNRESOLVED: request fields, encoding and requiredness beyond documented path placeholders are not specified."

- id: get_schedule_status
  label: Get Schedule Status
  kind: query
  http:
    method: GET
    path: /devices/schedule/{deviceId}/status
  params:
    - name: deviceId
      type: string
      description: "Documented path placeholder; valid values are not specified."

- id: get_rooms_in_group
  label: Get Rooms in a Group
  kind: query
  http:
    method: GET
    path: /devices/thermostats/{deviceId}/group/{groupId}/rooms
  params:
    - name: deviceId
      type: string
      description: "Documented path placeholder; valid values are not specified."
    - name: groupId
      type: string
      description: "Documented path placeholder; valid values are not specified."

- id: create_partner_receiver
  label: Create Partner Receiver
  kind: action
  http:
    method: POST
    path: /v2/events/partner
  params: []
  description: "UNRESOLVED: request fields, encoding and requiredness beyond documented path placeholders are not specified."

- id: get_assigned_events
  label: Get Assigned Events
  kind: query
  http:
    method: GET
    path: /v2/events/partner/events
  params: []

- id: set_events_to_subscribe
  label: Set Events to Subscribe To
  kind: action
  http:
    method: PUT
    path: /v2/events/partner/events
  params: []
  description: "UNRESOLVED: request fields, encoding and requiredness beyond documented path placeholders are not specified."

- id: unsubscribe_device_from_events
  label: Unsubscribe Device from Real-Time Events
  kind: action
  http:
    method: DELETE
    path: /v3/events/subscribe/subsystem/{subsystem}/mac/{deviceId}
  params:
    - name: subsystem
      type: string
      description: "Documented path placeholder; valid values are not specified."
    - name: deviceId
      type: string
      description: "Documented path placeholder; valid values are not specified."
  description: "UNRESOLVED: request fields, encoding and requiredness beyond documented path placeholders are not specified."

- id: get_device_subscription_state
  label: Get Device Subscription State
  kind: query
  http:
    method: GET
    path: /v3/events/subscribe/subsystem/{subsystem}/mac/{deviceId}
  params:
    - name: subsystem
      type: string
      description: "Documented path placeholder; valid values are not specified."
    - name: deviceId
      type: string
      description: "Documented path placeholder; valid values are not specified."

- id: subscribe_device
  label: Subscribe Device
  kind: action
  http:
    method: POST
    path: /v3/events/subscribe/subsystem/{subsystem}/mac/{deviceId}
  params:
    - name: subsystem
      type: string
      description: "Documented path placeholder; valid values are not specified."
    - name: deviceId
      type: string
      description: "Documented path placeholder; valid values are not specified."
  description: "UNRESOLVED: request fields, encoding and requiredness beyond documented path placeholders are not specified."

- id: get_acl_entries
  label: Get ACL Entries
  kind: query
  http:
    method: GET
    path: /
  params: []
  description: "Catalogue lists GET / for ACL entries; exact applicability, parameters and base URL are UNRESOLVED."
```

## Feedbacks
```yaml
# UNRESOLVED: response payload structures not documented in source excerpt
# GET methods imply state can be read but schemas not provided
```

## Variables
```yaml
# UNRESOLVED: configurable parameters not enumerated in source
```

## Events
```yaml
# Event subscription APIs present:
# - /v2/events/partner/events (subscribe/query)
# - /v3/events/subscribe/subsystem/{subsystem}/mac/{deviceId}
# UNRESOLVED: event types and payload schemas not documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source excerpt
```

## Notes
This source is a shared API method catalogue, not proof of RTH9585WF support or cloud-only operation. Request parameters list documented path placeholders only; empty lists do not establish that requests need no body/query/authentication fields. No base URL, content type, payload schema, token lifetime or mandatory refresh schedule is given. Create-token and refresh-token operations share POST /token, but their distinguishing request fields are UNRESOLVED. Event subsystem identifiers and ACL applicability are also UNRESOLVED.

<!-- UNRESOLVED: payload schemas for POST/PUT endpoints not included in source -->
<!-- UNRESOLVED: base URL for API calls not stated in source -->
<!-- UNRESOLVED: event type definitions not documented -->
<!-- Scope: camera, water-leak-detector, domestic-hot-water and shutoff-valve endpoints are explicitly other device classes in the catalogue; they are not thermostat commands. Shared auth/discovery/events remain included with model applicability UNRESOLVED. -->

## Provenance

```yaml
source_domains:
  - developer.honeywellhome.com
source_urls:
  - https://developer.honeywellhome.com/api-methods
retrieved_at: 2026-04-30T04:32:30.743Z
last_checked_at: 2026-09-27T15:05:12.333Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-27T15:05:12.333Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 applicable catalogue operations match; camera, leak, DHW and valve classes excluded; exact-model applicability remains unknown. (18 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "complete payload schemas for POST/PUT requests not included in source"
- "base URL not stated in source excerpt"
- "token format, expiry, scope details not in source excerpt"
- "powerable - no explicit power on/off command in source"
- "routable - no input/output routing for thermostat"
- "levelable - temperature setpoint commands may exist but payloads not documented"
- "OAuth2 client-credentials request fields and encoding are not documented in the source.\""
- "refresh-token request fields and encoding are not documented in the source.\""
- "payload schema not documented in source"
- "request fields, encoding and requiredness beyond documented path placeholders are not specified.\""
- "response payload structures not documented in source excerpt"
- "configurable parameters not enumerated in source"
- "event types and payload schemas not documented"
- "no multi-step sequences documented in source"
- "no safety warnings or interlock procedures in source excerpt"
- "payload schemas for POST/PUT endpoints not included in source"
- "base URL for API calls not stated in source"
- "event type definitions not documented"
- "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
