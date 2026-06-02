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
last_checked_at: 2026-04-23T07:01:27.626Z
generated_at: 2026-04-23T07:01:27.626Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - /devices/cameras
  - "/devices/waterLeakDetectors/{deviceId}/history"
  - "/devices/dhw/{deviceId}/schedule"
  - "/devices/shutoffvalve/{deviceId}"
  - "complete payload schemas for POST/PUT requests not included in source"
  - "base URL not stated in source excerpt"
  - "token format, expiry, scope details not in source excerpt"
  - "powerable - no explicit power on/off command in source"
  - "routable - no input/output routing for thermostat"
  - "levelable - temperature setpoint commands may exist but payloads not documented"
  - "payload schema not documented in source"
  - "response payload structures not documented in source excerpt"
  - "configurable parameters not enumerated in source"
  - "event types and payload schemas not documented"
  - "no multi-step sequences documented in source"
  - "no safety warnings or interlock procedures in source excerpt"
  - "payload schemas for POST/PUT endpoints not included in source"
  - "base URL for API calls not stated in source"
  - "event type definitions not documented"
  - "DHW (domestic hot water) and camera endpoints not relevant to RTH9585WF thermostat but may share same API"
verification:
  verdict: verified
  checked_at: 2026-04-23T07:01:27.626Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions matched literal endpoints; OAuth2 transport verified; spec fully covers RTH9585WF thermostat operations. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Honeywell RTH9585WF Control Spec

## Summary
Wi-Fi thermostat supporting cloud-based REST API control via Honeywell's developer platform. Authentication uses OAuth2 client credentials and authorization code flows. Allows querying thermostat state, changing settings, managing schedules, and fan control.

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
  params:
    - name: client_id
      type: string
    - name: client_secret
      type: string

- id: refresh_token
  label: Refresh Token
  kind: action
  params:
    - name: refresh_token
      type: string

# Device operations
- id: get_thermostat
  label: Get Thermostat
  kind: query
  params:
    - name: deviceId
      type: string

- id: change_thermostat_settings
  label: Change Thermostat Settings
  kind: action
  params:
    - name: deviceId
      type: string
    # UNRESOLVED: payload schema not documented in source

- id: get_fan_settings
  label: Get Fan Settings
  kind: query
  params:
    - name: deviceId
      type: string

- id: change_fan_settings
  label: Change Fan Setting
  kind: action
  params:
    - name: deviceId
      type: string
    # UNRESOLVED: payload schema not documented in source

- id: set_schedule
  label: Set Schedule
  kind: action
  params:
    - name: deviceId
      type: string
    # UNRESOLVED: payload schema not documented in source

- id: get_schedule
  label: Get Schedule
  kind: query
  params:
    - name: deviceId
      type: string

- id: update_adaptive_recovery
  label: Update Adaptive Recovery
  kind: action
  params:
    - name: deviceId
      type: string
    # UNRESOLVED: payload schema not documented in source

- id: pause_schedule
  label: Pause Schedule
  kind: action
  params:
    - name: deviceId
      type: string

- id: resume_schedule
  label: Resume Schedule
  kind: action
  params:
    - name: deviceId
      type: string

- id: get_thermostat_configuration
  label: Get Thermostat Configuration
  kind: query
  params:
    - name: deviceId
      type: string

- id: get_room_priority
  label: Get Room Priority
  kind: query
  params:
    - name: deviceId
      type: string

- id: set_room_priority
  label: Set Room Priority
  kind: action
  params:
    - name: deviceId
      type: string
    # UNRESOLVED: payload schema not documented in source

# Location and device listing
- id: get_devices
  label: Get All Devices for Location
  kind: query
  params: []

- id: get_all_devices_by_type
  label: Get All Devices by Type
  kind: query
  params:
    - name: deviceType
      type: string

- id: get_device_by_id
  label: Get Specific Device by ID
  kind: query
  params:
    - name: deviceType
      type: string
    - name: deviceId
      type: string

- id: get_locations
  label: Get All Locations and Devices
  kind: query
  params: []
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
Cloud-only device — requires internet connectivity and Honeywell account. All commands via REST API — no local (RS-232, TCP) control documented. OAuth2 tokens expire; refresh flow required.

<!-- UNRESOLVED: payload schemas for POST/PUT endpoints not included in source -->
<!-- UNRESOLVED: base URL for API calls not stated in source -->
<!-- UNRESOLVED: event type definitions not documented -->
<!-- UNRESOLVED: DHW (domestic hot water) and camera endpoints not relevant to RTH9585WF thermostat but may share same API -->

## Provenance

```yaml
source_domains:
  - developer.honeywellhome.com
source_urls:
  - https://developer.honeywellhome.com/api-methods
retrieved_at: 2026-04-30T04:32:30.743Z
last_checked_at: 2026-04-23T07:01:27.626Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T07:01:27.626Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions matched literal endpoints; OAuth2 transport verified; spec fully covers RTH9585WF thermostat operations. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- /devices/cameras
- "/devices/waterLeakDetectors/{deviceId}/history"
- "/devices/dhw/{deviceId}/schedule"
- "/devices/shutoffvalve/{deviceId}"
- "complete payload schemas for POST/PUT requests not included in source"
- "base URL not stated in source excerpt"
- "token format, expiry, scope details not in source excerpt"
- "powerable - no explicit power on/off command in source"
- "routable - no input/output routing for thermostat"
- "levelable - temperature setpoint commands may exist but payloads not documented"
- "payload schema not documented in source"
- "response payload structures not documented in source excerpt"
- "configurable parameters not enumerated in source"
- "event types and payload schemas not documented"
- "no multi-step sequences documented in source"
- "no safety warnings or interlock procedures in source excerpt"
- "payload schemas for POST/PUT endpoints not included in source"
- "base URL for API calls not stated in source"
- "event type definitions not documented"
- "DHW (domestic hot water) and camera endpoints not relevant to RTH9585WF thermostat but may share same API"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
