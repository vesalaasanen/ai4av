---
spec_id: admin/nuheat-thermostatplatform-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Nuheat ThermostatPlatform Series Control Spec"
manufacturer: Nuheat
model_family: "ThermostatPlatform Series"
aliases: []
compatible_with:
  manufacturers:
    - Nuheat
  models:
    - "ThermostatPlatform Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - nuheat.com
source_urls:
  - https://www.nuheat.com/products/thermostats/developer-api
retrieved_at: 2026-04-30T04:32:49.752Z
last_checked_at: 2026-04-23T08:17:55.062Z
generated_at: 2026-04-23T08:17:55.062Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "local/RS-232 control not documented; cloud API only"
  - "no discrete settable parameters other than thermostat state fields"
  - "no multi-step macros described in source"
  - "no safety warnings or interlock procedures in source"
  - "physical serial/RS-232 control not documented"
  - "voltage/power specifications not in source"
verification:
  verdict: verified
  checked_at: 2026-04-23T08:17:55.062Z
  matched_actions: 11
  action_count: 11
  confidence: low
  summary: "All 11 actions matched; transport verified with base_url, OAuth2, 1-hour access token (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# Nuheat ThermostatPlatform Series Control Spec

## Summary
Nuheat ThermostatPlatform Series cloud API. REST-based OpenAPI with OAuth2 authentication. Provides GET/PUT access to thermostats, groups, schedules, and energy logs. Supports SignalR-based change notifications.

<!-- UNRESOLVED: local/RS-232 control not documented; cloud API only -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: https://api.mynuheat.com/
auth:
  type: oauth2
  oauth2:
    grant_types:
      - implicit
      - authorization_code
      - hybrid
    scopes:
      - openapi
      - openid
      - profile
      - offline_access
    token_endpoint: https://identity.mynuheat.com/connect/token
    authorization_endpoint: https://identity.mynuheat.com/connect/authorize
    discovery_endpoint: https://identity.mynuheat.com/.well-known/openid-configuration
    access_token_expiration: 3600  # 1 hour in seconds
    refresh_token_expiration: 1296000  # 15 days in seconds
```

## Traits
```yaml
- queryable  # inferred: GET endpoints return thermostat state
- levelable  # inferred: SetPointTemp parameter present
```

## Actions
```yaml
- id: get_thermostat_list
  label: Get Thermostat List
  kind: query
  params: []

- id: get_thermostat
  label: Get Thermostat
  kind: query
  params:
    - name: serialNumber
      type: string
      description: Thermostat serial number

- id: update_thermostat
  label: Update Thermostat
  kind: action
  params:
    - name: serialNumber
      type: string
      description: Thermostat serial number
    - name: setPointTemp
      type: integer
      description: Target temperature (integer, units implied by device)
    - name: scheduleMode
      type: integer
      description: "1=Auto, 2=Hold, 3=Permanent Hold"
    - name: holdSetPointDateTime
      type: string
      description: ISO-8601 datetime for hold expiry (optional)

- id: get_groups
  label: Get Groups
  kind: query
  params: []

- id: update_group
  label: Update Group
  kind: action
  params:
    - name: groupId
      type: string

- id: get_schedules
  label: Get Schedules
  kind: query
  params: []

- id: update_schedule
  label: Update Schedule
  kind: action
  params:
    - name: scheduleId
      type: string

- id: get_account
  label: Get Account
  kind: query
  params: []

- id: get_energy_log_day
  label: Get Energy Log Day
  kind: query
  params:
    - name: serialNumber
      type: string
    - name: date
      type: string
      description: "Date: yyyy-MM-dd"

- id: get_energy_log_week
  label: Get Energy Log Week
  kind: query
  params:
    - name: serialNumber
      type: string
    - name: date
      type: string
      description: "Date: yyyy-MM-dd"

- id: get_energy_log_month
  label: Get Energy Log Month
  kind: query
  params:
    - name: serialNumber
      type: string
    - name: year
      type: integer
```

## Feedbacks
```yaml
- id: thermostat_state
  type: object
  properties:
    - serialNumber: string
    - setPointTemp: integer
    - scheduleMode: integer
    - holdSetPointDateTime: string

- id: energy_log_entry
  type: object
  properties:
    - entry: string
    - minutes: integer
    - energyKWattHour: number
    - chargeKWattHour: number
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters other than thermostat state fields
```

## Events
```yaml
- id: change_notification
  description: SignalR notification via /notificationsHost hub
  properties:
    - type: integer  # 1=UserAccount, 2=Thermostat, 3=Schedule, 4=Group
    - id: string
    - timeStamp: string  # ISO-8601 UTC
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Thermostat supports two operating modes: Auto (schedule-based) and Manual (direct setpoint). Auto mode has three sub-modes: Auto Schedule (1), Hold (2), Permanent Hold (3). Hold duration must be within 23 hours. All timestamps use ISO-8601 UTC format. Rate limits: 50 req/s, 750 req/30min, 20,000 req/12h, 250,000 req/7 days.
<!-- UNRESOLVED: physical serial/RS-232 control not documented -->
<!-- UNRESOLVED: voltage/power specifications not in source -->

## Provenance

```yaml
source_domains:
  - nuheat.com
source_urls:
  - https://www.nuheat.com/products/thermostats/developer-api
retrieved_at: 2026-04-30T04:32:49.752Z
last_checked_at: 2026-04-23T08:17:55.062Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:17:55.062Z
matched_actions: 11
action_count: 11
confidence: low
summary: "All 11 actions matched; transport verified with base_url, OAuth2, 1-hour access token (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "local/RS-232 control not documented; cloud API only"
- "no discrete settable parameters other than thermostat state fields"
- "no multi-step macros described in source"
- "no safety warnings or interlock procedures in source"
- "physical serial/RS-232 control not documented"
- "voltage/power specifications not in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
